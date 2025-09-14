import { Router } from "express";
import { listNotifications, markNotificationRead, markAllNotificationsRead } from "../controllers/notifications.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", requireAuth, listNotifications);
router.post("/read-all", requireAuth, markAllNotificationsRead);
router.post("/:id/read", requireAuth, markNotificationRead);

export default router;
