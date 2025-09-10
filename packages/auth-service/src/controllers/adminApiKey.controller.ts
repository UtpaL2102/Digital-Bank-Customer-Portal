// packages/auth-service/src/controllers/adminApiKey.controller.ts
import { Request, Response } from "express";
import crypto from "crypto";
import { prisma } from "../db/prismaClient";
import cryptoLib from "crypto";

function hashKey(raw: string) {
  return cryptoLib.createHash("sha256").update(raw).digest("hex");
}

export async function createAdminApiKey(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const { name, daysValid } = req.body as { name?: string; daysValid?: number };

    const raw = crypto.randomBytes(24).toString("hex"); // 48 chars
    const key_hash = hashKey(raw);
    const expires_at = daysValid ? new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000) : undefined;

    const rec = await prisma.adminApiKey.create({
      data: { user_id: userId, key_hash, name: name || null, expires_at }
    });

    return res.status(201).json({ id: rec.id, key: raw }); // show raw only once
  } catch (e) {
    console.error("createAdminApiKey:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" } });
  }
}

export async function listAdminApiKeys(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const items = await prisma.adminApiKey.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
    return res.json({ items });
  } catch (e) {
    console.error("listAdminApiKeys:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" } });
  }
}

export async function revokeAdminApiKey(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const { id } = req.params;
    const r = await prisma.adminApiKey.updateMany({ where: { id, user_id: userId }, data: { revoked: true } });
    if (r.count === 0) return res.status(404).json({ error: { code: "NOT_FOUND" } });
    return res.json({ ok: true });
  } catch (e) {
    console.error("revokeAdminApiKey:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" } });
  }
}
