import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

/**
 * GET /api/v1/notifications
 * optional query: unreadOnly=true
 */
export const listNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const unreadOnly = req.query.unreadOnly === "true";

    const where: any = { user_id: userId };
    if (unreadOnly) where.read = false;

    const notes = await prisma.notification.findMany({
      where,
      orderBy: { sent_at: "desc" },
    });

    return res.json({ notifications: notes });
  } catch (err) {
    console.error("listNotifications error:", err);
    return res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};

/**
 * POST /api/v1/notifications/:id/read
 */
export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const id = req.params.id;
    const note = await prisma.notification.findUnique({ where: { id } });
    if (!note) return res.status(404).json({ error: "Notification not found" });
    if (note.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    const updated = await prisma.notification.update({
      where: { id },
      data: { status: "read" },
    });

    return res.json({ notification: updated });
  } catch (err) {
    console.error("markNotificationRead error:", err);
    return res.status(500).json({ error: "Failed to mark notification read" });
  }
};

/**
 * POST /api/v1/notifications/read-all
 */
export const markAllNotificationsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await prisma.notification.updateMany({
      where: { user_id: userId, status: "unread" },
      data: { status: "read" },
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("markAllNotificationsRead error:", err);
    return res.status(500).json({ error: "Failed to mark notifications read" });
  }
};
