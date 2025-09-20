import { z } from "zod";

export const UpdateNotificationPreferencesSchema = z.object({
  email_enabled: z.boolean(),
  sms_enabled: z.boolean(),
  in_app_enabled: z.boolean(),
  transactions: z.boolean(),
  low_balance: z.boolean(),
  security: z.boolean(),
  low_balance_threshold: z.number().positive().optional(),
}).refine((data) => {
  // If any alerts are enabled, at least one notification channel must be enabled
  const hasEnabledAlerts = data.transactions || data.low_balance || data.security;
  const hasEnabledChannel = data.email_enabled || data.sms_enabled || data.in_app_enabled;

  return !hasEnabledAlerts || hasEnabledChannel;
}, {
  message: "At least one notification channel must be enabled if alerts are enabled",
}).refine((data) => {
  // Low balance threshold must be set if low balance alerts are enabled
  return !data.low_balance || (data.low_balance_threshold && data.low_balance_threshold > 0);
}, {
  message: "Low balance threshold must be positive when low balance alerts are enabled",
});