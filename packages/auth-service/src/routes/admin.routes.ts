// packages/auth-service/src/routes/admin.routes.ts
import { Router } from "express";
import * as ctrl from "../controllers/admin.controller";

const router = Router();

// Public admin registration & login (no requireAuth)
router.post("/admin/register", ctrl.registerAdmin);
router.post("/admin/login", ctrl.loginAdmin);

export default router;
