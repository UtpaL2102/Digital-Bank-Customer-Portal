import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db/prismaClient";
import { signAccessToken, signRefreshToken, hashToken } from "../services/auth.service";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, name, secret } = req.body as { email: string; password: string; name?: string; secret?: string };

    if (!email || !password || !secret) {
      return res.status(400).json({ error: { code: "INVALID_PAYLOAD", message: "email, password and secret required" } });
    }

    if (secret !== process.env.ADMIN_SIGNUP_SECRET) {
      return res.status(403).json({ error: { code: "INVALID_ADMIN_SECRET", message: "Invalid admin signup secret" } });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: { code: "ALREADY_EXISTS", message: "Email already registered" } });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        name: name ?? "",
        role: "admin",
        status: "verified" // admins are verified by default
      },
      select: { id: true, email: true, name: true, role: true, status: true, created_at: true }
    });

    return res.status(201).json({ user });
  } catch (err) {
    console.error("registerAdmin:", err);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to register admin" } });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      return res.status(400).json({ error: { code: "INVALID_PAYLOAD", message: "email and password required" } });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
    }

    const ok = await bcrypt.compare(password, user.password_hash || "");
    if (!ok) {
      return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
    }

    // Only allow admin or kyc_reviewer roles here
    if (user.role !== "admin" && user.role !== "kyc_reviewer") {
      return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not an admin" } });
    }

    // Issue tokens using your existing token.service
    const access_token = await signAccessToken({ id: user.id, role: user.role, status: user.status });
    const refresh_token = await signRefreshToken({ id: user.id });

    // Persist refresh token hashed in refreshToken table if you have it (same pattern as login)
    const token_hash = hashToken(refresh_token);
    try {
      await prisma.refreshToken.create({
        data: {
          user_id: user.id,
          token_hash,
          user_agent: req.headers["user-agent"]?.toString() || "",
          ip: (req.headers["x-forwarded-for"] as string)?.split(",")[0] || (req.socket.remoteAddress || ""),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      });
    } catch (e) {
      // Non-fatal - log but continue
      console.warn("loginAdmin: failed to persist refresh token:", e);
    }

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status };
    return res.json({ requires2fa: false, access_token, refresh_token, user: safeUser });
  } catch (err) {
    console.error("loginAdmin:", err);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to login" } });
  }
};
