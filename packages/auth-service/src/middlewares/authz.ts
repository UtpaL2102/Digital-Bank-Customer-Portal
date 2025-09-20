import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(process.env.AUTH_JWT_SECRET || "dev_super_secret_change_me");
const issuer = process.env.JWT_ISSUER || "digital-bank-auth";
const audience = process.env.JWT_AUDIENCE || "digitalbank";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
try {
const auth = req.header("authorization");
if (!auth?.startsWith("Bearer ")) throw new Error("NO_TOKEN");
const token = auth.slice("Bearer ".length);
const { payload } = await jwtVerify(token, secret(), { issuer, audience });
req.user = { 
  id: payload.sub as string, 
  role: payload.role as string, 
  status: payload.status as string 
};
next();
} catch {
res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Invalid or missing token" } });
}
}

export function requireRole(...roles: string[]) {
return (req: Request, res: Response, next: NextFunction) => {
const role = (req as any).user?.role || "user";
if (!roles.includes(role)) return res.status(403).json({ error: { code: "FORBIDDEN", message: "Insufficient role" } });
next();
};
}