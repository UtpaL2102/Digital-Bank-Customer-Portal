import { prisma } from "../db/prismaClient";

export async function createNotification(userId: string, type: string, title: string, message: string, data?: any) {
  return prisma.notification.create({
    data: {
      user_id: userId,
      type,
      title,
      message,
      data: data ?? undefined,
    },
  });
}

export async function listNotifications(userId: string, limit = 50, offset = 0) {
  return prisma.notification.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    take: limit,
    skip: offset,
  });
}

export async function markNotificationRead(notificationId: string, userId: string) {
  // Use updateMany to ensure we don't accidentally update other users' notif
  return prisma.notification.updateMany({
    where: { id: notificationId, user_id: userId },
    data: { read: true },
  });
}
