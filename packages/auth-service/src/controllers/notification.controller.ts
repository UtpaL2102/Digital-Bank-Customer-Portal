// packages/auth-service/src/controllers/notification.controller.ts
import { Request, Response } from "express";
import * as svc from "../services/notification.service";

export async function listUserNotifications(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const items = await svc.listNotifications(userId, limit, offset);
    res.json({ items, total: items.length });
  } catch (e) {
    console.error("listUserNotifications:", e);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to list notifications" } });
  }
}

export async function markRead(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const id = req.params.id;
    const r = await svc.markNotificationRead(id, userId);
    if (r.count === 0) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Notification not found" } });
    res.json({ ok: true });
  } catch (e) {
    console.error("markRead:", e);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to mark as read" } });
  }
}

export async function markAllRead(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const result = await svc.markAllRead(userId);
    res.json({ ok: true, count: result.count });
  } catch (e) {
    console.error("markAllRead:", e);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to mark all as read" } });
  }
}

export async function getUnreadCount(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id as string;
    const count = await svc.getUnreadCount(userId);
    res.json({ count });
  } catch (e) {
    console.error("getUnreadCount:", e);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unable to get unread count" } });
  }
}
