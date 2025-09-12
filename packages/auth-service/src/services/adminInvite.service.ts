
import crypto from "crypto";
import { prisma } from "../db/prismaClient.js";

export function genInviteToken(len = 32) {
  return crypto.randomBytes(len).toString("hex"); // 64 hex chars
}

export function hashInviteToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createAdminInviteRecord(email: string, createdBy: string, daysValid = 7, note?: string) {
  const token = genInviteToken();
  const token_hash = hashInviteToken(token);
  const expires_at = new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000);
  const invite = await prisma.adminInvite.create({
    data: { token_hash, email, created_by: createdBy, expires_at, note }
  });
  return { invite, raw_token: token };
}
