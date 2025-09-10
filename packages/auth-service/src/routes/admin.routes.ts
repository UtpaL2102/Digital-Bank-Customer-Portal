// packages/auth-service/src/routes/admin.routes.ts
import { Router } from "express";
import * as ctrl from "../controllers/admin.controller";
import { createAdminInvite, registerWithInvite } from "../controllers/adminInvite.controller";
import { requireAuth, requireRole } from "../middlewares/authz";
import { requireApiKey } from "../middlewares/apiKeyAuth.middleware";
import { createAdminApiKey, listAdminApiKeys, revokeAdminApiKey } from "../controllers/adminApiKey.controller";

const router = Router();


// Disable public register — invite flow is used instead
router.post("/admin/register", (_req, res) => {
  return res.status(403).json({ error: { code: "DISABLED", message: "Public admin registration disabled. Use invite flow." } });
});

//public admin login
router.post("/admin/login", ctrl.loginAdmin);

// Admin-only invite creation
router.post("/admin/invite", requireAuth, requireRole("admin"), createAdminInvite);

// Public endpoint to register using an invite token (single-use)
router.post("/admin/register-with-invite", registerWithInvite);

router.post("/admin/apikeys", requireAuth, requireRole("admin"), createAdminApiKey);
router.get("/admin/apikeys", requireAuth, requireRole("admin"), listAdminApiKeys);
router.post("/admin/apikeys/:id/revoke", requireAuth, requireRole("admin"), revokeAdminApiKey);


export default router;
