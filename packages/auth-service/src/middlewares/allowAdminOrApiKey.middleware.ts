// packages/auth-service/src/middlewares/allowAdminOrApiKey.middleware.ts
import { NextFunction, Request, Response } from "express";
import { requireApiKey } from "./apiKeyAuth.middleware.js";
import { requireAuth } from "./authz.js"; // your existing middleware

export function allowAdminOrApiKey(handler: any) {
  // returns an express middleware that tries ApiKey first, then JWT admin
  return async (req: Request, res: Response, next: NextFunction) => {
    // Try ApiKey
    try {
      const auth = req.header("authorization") || "";
      if (auth.startsWith("ApiKey ")) {
        // run requireApiKey
        return requireApiKey(req, res, next);
      }
      // otherwise fall back to JWT auth
      return requireAuth(req, res, next);
    } catch (e) {
      console.error("allowAdminOrApiKey:", e);
      return res.status(401).json({ error: { code: "UNAUTHENTICATED" } });
    }
  };
}
