import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma} from "../db/prismaClient";
import { signAccessToken, signRefreshToken, hashToken, signTempLoginToken } from "../services/auth.service";
import crypto from "crypto";

function generateNetbankingId() {
  return `DS-${crypto.randomBytes(4).toString("hex")}`;
}

export const register = async (req: Request, res: Response) => {

    const { name, email, phone_number, password } = req.body as { name: string; email: string; phone_number?: string; password: string };

    const existing = await prisma.user.findUnique({ where: { email } });
if (existing) return res.status(409).json({ error: { code: "EMAIL_IN_USE", message: "Email already registered" } });

const password_hash = await bcrypt.hash(password, 12);

// Initially create user without netbanking_id - it will be assigned after KYC
const user = await prisma.user.create({
  data: { 
    name, 
    email, 
    phone_number, 
    password_hash, 
    role: "user", 
    status: "pending_kyc"
  },
  select: { 
    id: true, 
    name: true, 
    email: true, 
    phone_number: true, 
    role: true, 
    status: true, 
    created_at: true 
  }
});

return res.status(201).json({ user });
};


export const login = async (req: Request, res: Response) => {
const { identifier, password } = req.body as { identifier: string; password: string };

// Normalize identifier for email lookup
  const normalized = identifier.trim();

let user = await prisma.user.findUnique({ where: { email: normalized } });
if (!user) {
    user = await prisma.user.findUnique({ where: { netbanking_id: normalized } });
  }

if (!user) {
return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid identifier or password" } });
}


// Narrow user into a const so TypeScript knows it's not null after this point
const foundUser = user;

const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

// If MFA enabled, return requires2fa=true (we’ll add the /auth/2fa/verify next)
  // If MFA enabled, return requires2fa=true and a short-lived temp_login_token (Pattern A)
  const mfa = await prisma.userMfa.findUnique({ where: { user_id: foundUser.id } });
  if (mfa && mfa.enabled) {
    try {
      const temp_login_token = await signTempLoginToken({ id: foundUser.id });
      return res.json({ requires2fa: true, temp_login_token });
    } catch (e) {
      console.error("login: failed to sign temp login token:", e);
      return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to start MFA flow" }});
    }
  }

// Issue tokens
const access_token = await signAccessToken({ id: user.id, role: user.role, status: user.status });

const refresh_token = await signRefreshToken({ id: user.id });

// Persist refresh token (hashed)
const token_hash = hashToken(refresh_token);

await prisma.refreshToken.create({
  data: {
    user_id: user.id,
    token_hash,
    user_agent: req.headers["user-agent"]?.toString(),
    ip: (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "",
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
});

const safeUser = { id: user.id, name: user.name, email: user.email, phone_number: user.phone_number, role: user.role, status: user.status, netbanking_id: user.netbanking_id };

return res.json({ requires2fa: false, access_token, refresh_token, user: safeUser });
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Invalid or missing token" } });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        role: true,
        status: true,
        netbanking_id: true,
        created_at: true,
        updated_at: true,
        mfa: {
          select: {
            enabled: true
          }
        }
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: { code: "USER_NOT_FOUND", message: "User not found" } });
    }

    // If the user is not fully KYC-verified, return the exact KYC_REQUIRED error
    // This prevents unverified users from accessing profile security features
    if (user.status !== "verified") {
      return res.status(403).json({
        error: {
          code: "KYC_REQUIRED",
          message: "Please complete KYC to access this feature.",
          details: [{ status: user.status }]
        }
      });
    }

    // Only transform and return profile data (including 2FA status) for verified users
    const transformedUser = {
      ...user,
      two_fa_enabled: user?.mfa?.enabled || false,
    };
    delete (transformedUser as any).mfa;

    // Return the profile only for verified users
    return res.json({ user: transformedUser });
  } catch (err) {
    console.error("me:", err);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
  }
};

export const approveKyc = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists and needs KYC
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: { code: "USER_NOT_FOUND", message: "User not found" } });
    }
    
    if (user.status === "verified") {
      return res.status(400).json({ error: { code: "ALREADY_VERIFIED", message: "User is already verified" } });
    }

    // Generate unique netbanking ID
    let netbanking_id = generateNetbankingId();
    let tries = 0;
    while (tries < 5) {
      const collision = await prisma.user.findUnique({ where: { netbanking_id } });
      if (!collision) break;
      netbanking_id = generateNetbankingId();
      tries++;
    }

    if (tries >= 5) {
      return res.status(500).json({ error: { code: "NETBANKING_GEN_FAILED", message: "Failed to generate unique netbanking ID" } });
    }

    // Update user status and assign netbanking ID
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "verified",
        netbanking_id,
        updated_at: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        role: true,
        status: true,
        netbanking_id: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.json({ user: updatedUser });
  } catch (err) {
    console.error("approveKyc:", err);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Failed to approve KYC" } });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Invalid or missing token" } });
    }

    const { name, phone_number } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone_number,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        role: true,
        status: true,
        netbanking_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return res.json({ user });
  } catch (err) {
    console.error("updateMe:", err);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Failed to update profile" } });
  }
};