// packages/bff/src/middlewares/admin.auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.AUTH_JWT_SECRET || "dev_super_secret_change_me";

export async function requireAdminBff(req: Request, res: Response, next: NextFunction) {
  try {
    const a = (req.headers.authorization || "");
    if (!a.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
    const token = a.slice(7);
    const { payload } = await jwtVerify(token, Buffer.from(JWT_SECRET), { algorithms: ["HS256"] });
    const p = payload as any;
    if (p.role !== "admin") return res.status(403).json({ error: "Admin only" });
    (req as any).user = { id: p.sub, role: p.role };
    next();
  } catch (err) {
    console.error("BFF requireAdmin err", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
