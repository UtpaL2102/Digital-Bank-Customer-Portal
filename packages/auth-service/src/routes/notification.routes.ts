// packages/auth-service/src/routes/notification.routes.ts
import { Router } from "express";
import { listUserNotifications, markRead, markAllRead, getUnreadCount } from "../controllers/notification.controller";
import { 
  getNotificationPreferences,
  updateNotificationPreferences
} from "../controllers/notification-preferences.controller";
import { requireAuth } from "../middlewares/authz";
import { validate } from "../middlewares/validate.middleware";
import { UpdateNotificationPreferencesSchema } from "../schemas/notification.schemas";

const router = Router();

// Notifications
router.get("/notifications", requireAuth, listUserNotifications);
router.post("/notifications/:id/read", requireAuth, markRead);
router.post("/notifications/read-all", requireAuth, markAllRead);
router.get("/notifications/unread-count", requireAuth, getUnreadCount);

// Notification Preferences
router.get("/notification-preferences", requireAuth, getNotificationPreferences);
router.put(
  "/notification-preferences",
  requireAuth,
  validate(UpdateNotificationPreferencesSchema),
  updateNotificationPreferences
);

export default router;
