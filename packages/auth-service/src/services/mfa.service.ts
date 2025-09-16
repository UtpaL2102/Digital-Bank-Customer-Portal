// packages/auth-service/src/services/mfa.service.ts
import { prisma } from "../db/prismaClient";
import crypto from "crypto";
import { authenticator } from "otplib";
import bcrypt from "bcryptjs";

const KEY = process.env.MFA_ENCRYPTION_KEY;
if (!KEY) throw new Error("MFA_ENCRYPTION_KEY is required");

function encryptSecret(plain: string) {
  // AES-256-GCM using a 32-byte key (KEY should be hex or base64)
  const key = Buffer.from(KEY || '', "hex");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // return hex encoded: iv:tag:encrypted
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

function decryptSecret(enc: string) {
  const key = Buffer.from(KEY || '', "hex");
  const [ivHex, tagHex, encryptedHex] = enc.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

export function generateTotpSecret() {
  // returns base32 secret (otplib default)
  return authenticator.generateSecret();
}

export function otpauthUrl(userLabel: string, secret: string, issuer = "YourBank") {
  return authenticator.keyuri(userLabel, issuer, secret); // otpauth://...
}

export async function upsertTempSecret(userId: string, secretPlain: string) {
  const secret_encrypted = encryptSecret(secretPlain);
  // Upsert a UserMfa row. Keep enabled=false until verified.
  await prisma.userMfa.upsert({
    where: { user_id: userId },
    create: { user_id: userId, secret_encrypted, enabled: false },
    update: { secret_encrypted, enabled: false }
  });
  // We use user_id as temp_secret_id (simple pattern A)
  return userId;
}

export function verifyTotp(secretPlain: string, code: string) {
  // allow slight window if desired
  return authenticator.check(code, secretPlain);
}

export async function finalizeEnableMfa(userId: string) {
  // set enabled=true (secret already stored)
  await prisma.userMfa.update({ where: { user_id: userId }, data: { enabled: true }});
  // generate backup codes (8 codes)
  const rawCodes: string[] = [];
  const hashedPromises: Promise<any>[] = [];
  for (let i = 0; i < 8; i++) {
    const code = crypto.randomBytes(6).toString("hex"); // 12 hex chars
    rawCodes.push(code);
    hashedPromises.push(bcrypt.hash(code, 12).then(h => {
      return prisma.userMfaBackupCode.create({ data: { user_id: userId, code_hash: h }});
    }));
  }
  await Promise.all(hashedPromises);
  return rawCodes; // plaintext to show once to user
}

export async function getDecryptedSecretByUser(userId: string) {
  const m = await prisma.userMfa.findUnique({ where: { user_id: userId } });
  if (!m) return null;
  return decryptSecret(m.secret_encrypted);
}

/**
 * Consume a backup code: find by user_id and compare provided code; mark used_at if matches.
 * Returns true if consumed.
 */
export async function tryConsumeBackupCode(userId: string, code: string) {
  const codes = await prisma.userMfaBackupCode.findMany({ where: { user_id: userId } });
  for (const c of codes) {
    if (c.used_at) continue;
    const ok = await bcrypt.compare(code, c.code_hash);
    if (ok) {
      await prisma.userMfaBackupCode.update({ where: { id: c.id }, data: { used_at: new Date() } });
      return true;
    }
  }
  return false;
}

export async function disableMfaForUser(userId: string) {
  // mark mfa disabled and delete backup codes (or mark used)
  await prisma.userMfa.update({ where: { user_id: userId }, data: { enabled: false }});
  await prisma.userMfaBackupCode.deleteMany({ where: { user_id: userId } });
  return;
}
