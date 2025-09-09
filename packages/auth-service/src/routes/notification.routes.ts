// packages/auth-service/src/routes/notification.routes.ts
import { Router } from "express";
import { listUserNotifications, markRead } from "../controllers/notification.controller";
import { requireAuth } from "../middlewares/authz"; // use your auth middleware in auth-service

const router = Router();

router.get("/notifications", requireAuth, listUserNotifications);
router.post("/notifications/:id/read", requireAuth, markRead);

export default router;
