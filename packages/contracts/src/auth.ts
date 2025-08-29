import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const MeSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  mfaEnabled: z.boolean(),
  kycStatus: z.string(),
});
export type MeDto = z.infer<typeof MeSchema>;

export const SessionsSchema = z.object({
  sessions: z.array(z.object({
    id: z.string(),
    device: z.string(),
    createdAt: z.string(),
  })),
});
export type SessionsDto = z.infer<typeof SessionsSchema>;

export const TwoFASchema = z.object({
  code: z.string().length(6),
});
export type TwoFADto = z.infer<typeof TwoFASchema>;

export const KycDetailsSchema = z.object({
  status: z.string(),
  score: z.number(),
  reason: z.string().optional(),
});
export type KycDetailsDto = z.infer<typeof KycDetailsSchema>;

export const NotificationPrefsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  push: z.boolean(),
});
export type NotificationPrefsDto = z.infer<typeof NotificationPrefsSchema>;
