import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma} from "../db/prismaClient";
import { signAccessToken, signRefreshToken, hashToken } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {

    const { name, email, phone_number, password } = req.body as { name: string; email: string; phone_number?: string; password: string };

    const existing = await prisma.user.findUnique({ where: { email } });
if (existing) return res.status(409).json({ error: { code: "EMAIL_IN_USE", message: "Email already registered" } });

const password_hash = await bcrypt.hash(password, 12);
const user = await prisma.user.create({
data: { name, email, phone_number, password_hash, role: "user", status: "pending_kyc" },
select: { id: true, name: true, email: true, phone_number: true, role: true, status: true, created_at: true }
});

return res.status(201).json({ user });
};

export const login = async (req: Request, res: Response) => {
const { email, password } = req.body as { email: string; password: string };

const user = await prisma.user.findUnique({ where: { email } });
if (!user) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

// If MFA enabled, return requires2fa=true (we’ll add the /auth/2fa/verify next)
const mfa = await prisma.userMfa.findUnique({ where: { user_id: user.id } });
if (mfa && mfa.enabled) {
return res.json({ requires2fa: true });
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

const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status };
return res.json({ requires2fa: false, access_token, refresh_token, user: safeUser });
};