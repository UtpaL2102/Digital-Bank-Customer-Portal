// packages/account-service/src/middlewares/admin.auth.middleware.ts
import { Request, Response, NextFunction } from "express";

/**
 * requireAdmin
 * - Assumes req.user is set by earlier auth middleware (e.g. `auth.forwardContext` / `requireAuth`)
 * - Checks role === 'admin'. Optionally ensures status !== 'suspended' (or === 'active').
 */
export default function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (user?.role === "admin") return next();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // role check
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // optional: require admin to be active (but don't require 'verified' KYC)
  // Change this logic to fit your system policies.
  if (user.status && user.status === "suspended") {
    return res.status(403).json({ error: "Account suspended" });
  }

  // allowed
  return next();
}
