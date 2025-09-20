import { Router } from "express";
import { requireAuth } from "../middlewares/authz";
import { sessionMiddleware } from "../middlewares/session.middleware";
import * as sessionCtrl from "../controllers/session.controller";

export const sessionRouter = Router();

// List all active sessions for current user
sessionRouter.get(
  "/auth/sessions",
  requireAuth,
  sessionMiddleware,
  sessionCtrl.listSessions
);

// Revoke a specific session
sessionRouter.delete(
  "/auth/sessions/:id",
  requireAuth,
  sessionMiddleware,
  sessionCtrl.revokeSession
);

// Revoke all sessions except current
sessionRouter.delete(
  "/auth/sessions",
  requireAuth,
  sessionMiddleware,
  sessionCtrl.revokeAllSessions
);

export default sessionRouter;