import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schemas";
import * as ctrl from "../controllers/auth.controller";
import * as mfaCtrl from "../controllers/mfa.controller";
import { requireAuth } from "../middlewares/authz";
import * as pwdCtrl from "../controllers/password.controller";


export const authRouter = Router();

authRouter.post("/auth/register", validate(RegisterSchema), ctrl.register);

authRouter.post("/auth/login", validate(LoginSchema), ctrl.login);

// Profile management
authRouter.get("/me", requireAuth, ctrl.me);
authRouter.put("/me", requireAuth, ctrl.updateMe);

// authRouter.post("/auth/register-admin", ctrl.registerAdmin);

// MFA routes
authRouter.post("/auth/2fa/enable", requireAuth, mfaCtrl.enable);
authRouter.post("/auth/2fa/verify", requireAuth, mfaCtrl.verify);
authRouter.post("/auth/2fa/disable", requireAuth, mfaCtrl.disable);

// login-verify (no auth required since we use temp token)
authRouter.post("/auth/2fa/login-verify", mfaCtrl.loginVerify);

// Password mgmt routes
authRouter.post("/auth/change-password", requireAuth, pwdCtrl.changePassword);
authRouter.post("/auth/password-reset/request", pwdCtrl.requestPasswordReset);
authRouter.post("/auth/password-reset/verify", pwdCtrl.verifyPasswordReset);

// KYC approval (admin only)
authRouter.post("/users/:userId/approve-kyc", requireAuth, ctrl.approveKyc);

export default authRouter;