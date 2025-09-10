// packages/auth-service/src/controllers/adminInvite.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db/prismaClient";
import { createAdminInviteRecord, hashInviteToken } from "../services/adminInvite.service";

export async function createAdminInvite(req: Request, res: Response) {
  try {
    const createdBy = (req as any).user.id as string;
    const { email, daysValid = 7, note } = req.body;
    if (!email) return res.status(400).json({ error: { code: "MISSING_EMAIL" } });

    const { invite, raw_token } = await createAdminInviteRecord(email, createdBy, daysValid, note);
    // raw_token shown only once to operator
    return res.status(201).json({ inviteId: invite.id, token: raw_token, expires_at: invite.expires_at });
  } catch (e) {
    console.error("createAdminInvite:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" } });
  }
}

export async function registerWithInvite(req: Request, res: Response) {
  try {
    const { token, email, password, name } = req.body as { token: string; email: string; password: string; name?: string; };
    if (!token || !email || !password) return res.status(400).json({ error: { code: "INVALID_PAYLOAD" } });

    const token_hash = hashInviteToken(token);
    const invite = await prisma.adminInvite.findFirst({ where: { token_hash } });
    if (!invite) return res.status(400).json({ error: { code: "INVALID_INVITE" } });
    if (invite.used) return res.status(400).json({ error: { code: "INVITE_USED" } });
    if (invite.expires_at < new Date()) return res.status(400).json({ error: { code: "INVITE_EXPIRED" } });

    // optional: enforce invite.email matches provided email
    if (invite.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({ error: { code: "EMAIL_MISMATCH", message: "Invite email does not match" } });
    }

    // create admin user
    const pwHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password_hash: pwHash, name: name ?? "", role: "admin", status: "verified" },
      select: { id: true, email: true, name: true, role: true, status: true }
    });

    // mark invite used
    await prisma.adminInvite.update({
      where: { id: invite.id },
      data: { used: true, used_at: new Date(), used_by: user.id }
    });

    return res.status(201).json({ user });
  } catch (e) {
    console.error("registerWithInvite:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" } });
  }
}
