// packages/auth-service/src/services/password.service.ts
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "../db/prismaClient";
import { secret, issuer, audience } from "./auth.service";
import * as mfaService from "./mfa.service";

/* TTL for reset token: accepts "15m" or plain seconds "900" */
const RAW_PW_RESET_TTL = process.env.PASSWORD_RESET_TTL || process.env.PASSWORD_RESET_TTL_SECONDS || "15m";
function normalizeTtl(raw: string): string {
  if (!raw || typeof raw !== "string") return "15m";
  const trimmed = raw.trim();
  if (/^\d+$/.test(trimmed)) return `${trimmed}s`;
  return trimmed;
}
const PASSWORD_RESET_TTL = normalizeTtl(RAW_PW_RESET_TTL);

/** Sign stateless password reset token */
export async function signPasswordResetToken(userId: string) {
  return await new SignJWT({ kind: "pwd_reset" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime(PASSWORD_RESET_TTL)
    .sign(secret());
}

/** Verify password reset token */
export async function verifyPasswordResetToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer, audience });
    if (!payload || (payload as any).kind !== "pwd_reset") return null;
    return payload as any;
  } catch (err) {
    return null;
  }
}

/** Change password and revoke refresh tokens */
export async function changePasswordForUser(userId: string, newPassword: string) {
  const newHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: userId }, data: { password_hash: newHash }});
  // revoke refresh tokens (mark revoked_at)
  await prisma.refreshToken.updateMany({
    where: { user_id: userId, revoked_at: null },
    data: { revoked_at: new Date() }
  });
}

/** Revoke all refresh tokens helper */
export async function revokeAllRefreshTokensForUser(userId: string) {
  await prisma.refreshToken.updateMany({
    where: { user_id: userId, revoked_at: null },
    data: { revoked_at: new Date() }
  });
}

/** Create a reset token for a user by identifier (email or netbanking id) */
export async function createPasswordResetForUserByIdentifier(identifier: string) {
  let user = await prisma.user.findUnique({ where: { email: identifier }});
  if (!user) user = await prisma.user.findUnique({ where: { netbanking_id: identifier }});
  if (!user) return null;
  const token = await signPasswordResetToken(user.id);
  // In production you would email the token. For local/dev we return it to caller.
  return token;
}

/**
 * Verify token + optional otp, then reset password.
 * Returns { ok: true, userId } or { ok: false, reason: "..." }.
 */
export async function verifyAndResetPassword(token: string, newPassword: string, otp?: string) {
  const decoded = await verifyPasswordResetToken(token);
  if (!decoded || !decoded.sub) return { ok: false, reason: "INVALID_TOKEN" };
  const userId = decoded.sub as string;
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (!user) return { ok: false, reason: "USER_NOT_FOUND" };

  const mfa = await prisma.userMfa.findUnique({ where: { user_id: userId }});
  if (mfa && mfa.enabled) {
    if (!otp) return { ok: false, reason: "MFA_REQUIRED" };
    const secretPlain = await mfaService.getDecryptedSecretByUser(userId);
    let okCode = false;
    if (secretPlain) okCode = mfaService.verifyTotp(secretPlain, otp);
    if (!okCode) okCode = await mfaService.tryConsumeBackupCode(userId, otp);
    if (!okCode) return { ok: false, reason: "INVALID_OTP" };
  }

  await changePasswordForUser(userId, newPassword);
  return { ok: true, userId };
}
