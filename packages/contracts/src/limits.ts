import { z } from 'zod';

export const LimitGetSchema = z.object({
  accountId: z.string(),
  dailyLimit: z.number(),
  monthlyLimit: z.number(),
  usedToday: z.number(),
  usedMonth: z.number(),
});
export type LimitGetDto = z.infer<typeof LimitGetSchema>;

export const LimitRequestSchema = z.object({
  accountId: z.string(),
  requestedLimit: z.number(),
  reason: z.string(),
});
export type LimitRequestDto = z.infer<typeof LimitRequestSchema>;
