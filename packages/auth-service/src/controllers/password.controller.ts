// packages/auth-service/src/controllers/password.controller.ts
import { Request, Response } from "express";
import * as pwdService from "../services/password.service";
import { prisma } from "../db/prismaClient";
import bcrypt from "bcryptjs";
import * as mfaService from "../services/mfa.service";

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id as string;
    if (!userId) return res.status(401).json({ error: { code: "UNAUTHENTICATED" }});

    const { current_password, new_password, code } = req.body as { current_password: string; new_password: string; code?: string };
    if (!current_password || !new_password) return res.status(400).json({ error: { code: "MISSING_FIELDS" }});

    const user = await prisma.user.findUnique({ where: { id: userId }});
    if (!user) return res.status(404).json({ error: { code: "USER_NOT_FOUND" }});

    const ok = await bcrypt.compare(current_password, user.password_hash);
    if (!ok) return res.status(401).json({ error: { code: "INVALID_PASSWORD", message: "Current password incorrect" }});

    const mfa = await prisma.userMfa.findUnique({ where: { user_id: userId }});
    if (mfa && mfa.enabled) {
      if (!code) return res.status(400).json({ error: { code: "MFA_REQUIRED", message: "TOTP or backup code required" }});
      const secret = await mfaService.getDecryptedSecretByUser(userId);
      let okCode = false;
      if (secret) okCode = mfaService.verifyTotp(secret, code);
      if (!okCode) okCode = await mfaService.tryConsumeBackupCode(userId, code);
      if (!okCode) return res.status(400).json({ error: { code: "INVALID_CODE", message: "Invalid MFA code" }});
    }

    await pwdService.changePasswordForUser(userId, new_password);
    await prisma.auditLog.create({ data: { user_id: userId, action: "password_changed", details: "User changed password" }});

    return res.json({ ok: true });
  } catch (e) {
    console.error("changePassword:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, customer_id } = req.body as { email?: string; customer_id?: string };
    const identifier = email || customer_id;
    if (!identifier) return res.status(400).json({ error: { code: "MISSING_IDENTIFIER" }});

    const token = await pwdService.createPasswordResetForUserByIdentifier(identifier);
    if (token) {
      // In prod: send token to email. For dev: log it so you can test.
      console.info(`Password reset token for ${identifier}: ${token}`);
      // Optionally return token in dev mode only (NOT recommended in prod).
    }

    // Always return ok to avoid enumeration
    return res.json({ ok: true });
  } catch (e) {
    console.error("requestPasswordReset:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};

export const verifyPasswordReset = async (req: Request, res: Response) => {
  try {
    const { token, new_password, otp_if_user_has_mfa } = req.body as { token?: string; new_password?: string; otp_if_user_has_mfa?: string };
    if (!token || !new_password) return res.status(400).json({ error: { code: "MISSING_FIELDS" }});

    const r = await pwdService.verifyAndResetPassword(token, new_password, otp_if_user_has_mfa);
    if (!r.ok) {
      if (r.reason === "INVALID_TOKEN") return res.status(400).json({ error: { code: "INVALID_TOKEN" }});
      if (r.reason === "USER_NOT_FOUND") return res.status(404).json({ error: { code: "USER_NOT_FOUND" }});
      if (r.reason === "MFA_REQUIRED") return res.status(400).json({ error: { code: "MFA_REQUIRED", message: "OTP required for this account" }});
      if (r.reason === "INVALID_OTP") return res.status(400).json({ error: { code: "INVALID_OTP", message: "Invalid TOTP or backup code" }});
      return res.status(400).json({ error: { code: "INVALID_REQUEST" }});
    }

    await prisma.auditLog.create({ data: { user_id: r.userId as string, action: "password_reset", details: "User reset password via token" }});
    return res.json({ ok: true });
  } catch (e) {
    console.error("verifyPasswordReset:", e);
    return res.status(500).json({ error: { code: "INTERNAL_ERROR" }});
  }
};
