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

// generate netbanking_id and ensure uniqueness
  let netbanking_id = generateNetbankingId();
  let tries = 0;
  while (tries < 5) {
    const collision = await prisma.user.findUnique({ where: { netbanking_id } });
    if (!collision) break;
    netbanking_id = generateNetbankingId();
    tries++;
  }

const user = await prisma.user.create({
data: { name, email, phone_number, password_hash, role: "user", status: "pending_kyc",netbanking_id },
select: { id: true, name: true, email: true, phone_number: true, role: true, status: true, created_at: true }
});

return res.status(201).json({ user, netbanking_id });
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
ip: (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || ""
,
expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
}
});

const safeUser = { id: user.id, name: user.name, email: user.email,  phone_number: user.phone_number, role: user.role, status: user.status, netbanking_id: user.netbanking_id };

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
      },
    });

    if (!user) {
      return res.status(404).json({ error: { code: "USER_NOT_FOUND", message: "User not found" } });
    }

    // If the user is not fully KYC-verified, return the exact KYC_REQUIRED error
    if (user.status !== "verified") {
      return res.status(403).json({
        error: {
          code: "KYC_REQUIRED",
          message: "Please complete KYC to access this feature.",
          details: [{ status: user.status }]
        }
      });
    }

    // user is verified — return the profile
    return res.json({ user });
  } catch (err) {
    console.error("me:", err);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
  }
};