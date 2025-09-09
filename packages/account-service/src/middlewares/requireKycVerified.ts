import { NextFunction, Request, Response } from "express";

export function requireKycVerifiedSvc(req: Request, res: Response, next: NextFunction) {
const status = req.header("x-user-status");
// Minimal trust of BFF header. For stronger security, call auth-service /auth/me and verify status server-side.
if (status === "verified") return next();
return res.status(403).json({ error: { code: "KYC_REQUIRED", message: "KYC not verified" } });
}