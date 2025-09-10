// packages/auth-service/src/middlewares/apiKeyAuth.middleware.ts
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { prisma } from "../db/prismaClient";

function hashKey(raw: string) {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

// This middleware checks Authorization: ApiKey <raw> header.
// If valid, sets req.user = { id: userId, role: 'admin', status: 'verified', apiKeyAuth: true }
export async function requireApiKey(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.header("authorization") || "";
    if (!auth.startsWith("ApiKey ")) return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Missing ApiKey" } });
    const raw = auth.slice("ApiKey ".length).trim();
    const key_hash = hashKey(raw);

    const rec = await prisma.adminApiKey.findFirst({ where: { key_hash, revoked: false } });
    if (!rec) return res.status(401).json({ error: { code: "INVALID_API_KEY" } });
    if (rec.expires_at && rec.expires_at < new Date()) return res.status(401).json({ error: { code: "API_KEY_EXPIRED" } });

    const user = await prisma.user.findUnique({ where: { id: rec.user_id } });
    if (!user) return res.status(401).json({ error: { code: "INVALID_API_KEY" } });

    // attach user (admin)
    (req as any).user = { id: user.id, role: user.role, status: user.status, apiKeyAuth: true };
    next();
  } catch (e) {
    console.error("requireApiKey:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" } });
  }
}
