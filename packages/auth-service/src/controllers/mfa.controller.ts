// packages/auth-service/src/controllers/mfa.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db/prismaClient";
import * as mfaService from "../services/mfa.service";
import { signAccessToken, signRefreshToken, hashToken, verifyTempLoginToken } from "../services/auth.service";

/**
 * POST /auth/2fa/enable
 * Authenticated: generate temp secret, store encrypted, return otpauth_url + temp_secret_id
 */
export const enable = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) return res.status(401).json({ error: { code: "UNAUTHENTICATED" }});

    const secret = mfaService.generateTotpSecret();
    await mfaService.upsertTempSecret(userId, secret);

    const user = await prisma.user.findUnique({ where: { id: userId }});
    const label = user ? `${user.email}` : userId;
    const otpauth_url = mfaService.otpauthUrl(label, secret, process.env.MFA_ISSUER || "YourBank");

    return res.json({ otpauth_url, temp_secret_id: userId });
  } catch (e) {
    console.error("mfa.enable:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};

/**
 * POST /auth/2fa/verify
 * Authenticated: verify TOTP, finalize enabling, return backup codes (plaintext once)
 */
export const verify = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) return res.status(401).json({ error: { code: "UNAUTHENTICATED" }});

    const { temp_secret_id, code } = req.body as { temp_secret_id?: string; code: string };
    const tid = temp_secret_id || userId;

    const secret = await mfaService.getDecryptedSecretByUser(tid);
    if (!secret) return res.status(400).json({ error: { code: "NO_TEMP_SECRET", message: "No MFA setup found" }});

    const ok = mfaService.verifyTotp(secret, code);
    if (!ok) return res.status(400).json({ error: { code: "INVALID_CODE", message: "Invalid TOTP code" }});

    const backupCodes = await mfaService.finalizeEnableMfa(tid);

    await prisma.auditLog.create({ data: { user_id: userId, action: "2fa_enabled", details: "User enabled TOTP 2FA" }});
    return res.json({ ok: true, backup_codes: backupCodes });
  } catch (e) {
    console.error("mfa.verify:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};

/**
 * POST /auth/2fa/disable
 * Authenticated: require password + TOTP or backup code; disables MFA.
 */
export const disable = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) return res.status(401).json({ error: { code: "UNAUTHENTICATED" }});

    const { password, code } = req.body as { password: string; code?: string };
    const user = await prisma.user.findUnique({ where: { id: userId }});
    if (!user) return res.status(404).json({ error: { code: "USER_NOT_FOUND" }});
    const okPwd = await bcrypt.compare(password, user.password_hash);
    if (!okPwd) return res.status(401).json({ error: { code: "INVALID_PASSWORD" }});

    // try TOTP
    const secret = await mfaService.getDecryptedSecretByUser(userId);
    let ok = false;
    if (secret && code) ok = mfaService.verifyTotp(secret, code);
    // fallback to backup code
    if (!ok && code) ok = await mfaService.tryConsumeBackupCode(userId, code);
    if (!ok) return res.status(400).json({ error: { code: "INVALID_CODE", message: "Invalid TOTP or backup code" }});

    await mfaService.disableMfaForUser(userId);
    await prisma.auditLog.create({ data: { user_id: userId, action: "2fa_disabled", details: "User disabled TOTP 2FA" }});
    return res.json({ ok: true });
  } catch (e) {
    console.error("mfa.disable:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};

/**
 * POST /auth/2fa/login-verify
 * Accepts temp_login_token (preferred) + code, verifies and returns final tokens.
 * Also supports fallback identifier+password+code.
 */
export const loginVerify = async (req: Request, res: Response) => {
  try {
    const { temp_login_token, identifier, password, code } = req.body as any;

    // 1) try temp token path
    let userId: string | null = null;
    if (temp_login_token) {
      const decoded: any = await verifyTempLoginToken(temp_login_token);
      if (!decoded) return res.status(400).json({ error: { code: "INVALID_TEMP_TOKEN" }});
      userId = decoded.sub as string;
    } else {
      // fallback: identifier+password
      if (!identifier || !password) return res.status(400).json({ error: { code: "MISSING_CREDENTIALS" }});
      let user = await prisma.user.findUnique({ where: { email: identifier }});
      if (!user) user = await prisma.user.findUnique({ where: { netbanking_id: identifier }});
      if (!user) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS" }});
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS" }});
      userId = user.id;
    }

    const user = await prisma.user.findUnique({ where: { id: userId! }});
    if (!user) return res.status(404).json({ error: { code: "USER_NOT_FOUND" }});

    // verify code (TOTP or backup)
    const secret = await mfaService.getDecryptedSecretByUser(userId!);
    let okCode = false;
    if (secret && code) okCode = mfaService.verifyTotp(secret, code);
    if (!okCode && code) okCode = await mfaService.tryConsumeBackupCode(userId!, code);
    if (!okCode) return res.status(400).json({ error: { code: "INVALID_CODE" }});

    // issue tokens (same as login success)
    const access_token = await signAccessToken({ id: user.id, role: user.role, status: user.status });
    const refresh_token = await signRefreshToken({ id: user.id });
    const hashed = hashToken(refresh_token);
    await prisma.refreshToken.create({ data: { user_id: user.id, token_hash: hashed, expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });

    return res.json({
      requires2fa: false,
      access_token,
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        status: user.status,
        netbanking_id: user.netbanking_id
      }
    });
  } catch (e) {
    console.error("mfa.loginVerify:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};
