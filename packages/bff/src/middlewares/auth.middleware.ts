import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(process.env.AUTH_JWT_SECRET || "dev_super_secret_change_me");
const issuer = process.env.JWT_ISSUER || "digital-bank-auth";
const audience = process.env.JWT_AUDIENCE || "digitalbank";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
try {
const auth = req.header("authorization");
if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Missing token" } });
const token = auth.slice("Bearer ".length);
const { payload } = await jwtVerify(token, secret(), { issuer, audience });
(req as any).user = { id: payload.sub, role: payload.role, status: payload.status };
next();
} catch {
return res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Invalid token" } });
}
}

export function requireKycVerified(req: Request, res: Response, next: NextFunction) {
const user = (req as any).user || {};
  // allow admins and kyc_reviewer roles to bypass KYC check
  if (user.role === "admin" || user.role === "kyc_reviewer") return next();

  const status = user.status as string | undefined;
if (status === "verified" ||status==="active") return next();

return res.status(403).json({
error: {
code: "KYC_REQUIRED",
message: "Please complete KYC to access this feature.",
details: [{ status }]
}
});
}