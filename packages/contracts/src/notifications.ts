import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.string(),
  type: z.string(),
  message: z.string(),
  read: z.boolean(),
  createdAt: z.string(),
});
export type NotificationDto = z.infer<typeof NotificationSchema>;

export const MarkReadSchema = z.object({
  id: z.string(),
});
export type MarkReadDto = z.infer<typeof MarkReadSchema>;
