import { z } from 'zod';

export const MonitoringRecordSchema = z.object({
  type: z.enum(['performance', 'error', 'audit']),
  data: z.record(z.any())
});

export const MonitoringThresholdsSchema = z.object({
  maxRetryAttempts: z.number().int().min(1).max(10),
  processingTimeThreshold: z.number().int().min(1000).max(60000),
  errorRateThreshold: z.number().min(0).max(1),
  warningThreshold: z.number().min(0).max(1)
});

export const DefaultLimitsSchema = z.object({
  defaultDailyLimit: z.number().positive(),
  defaultMonthlyLimit: z.number().positive(),
  maxDailyLimit: z.number().positive(),
  maxMonthlyLimit: z.number().positive()
}).refine(data => data.defaultDailyLimit <= data.maxDailyLimit, {
  message: "Default daily limit must not exceed max daily limit"
}).refine(data => data.defaultMonthlyLimit <= data.maxMonthlyLimit, {
  message: "Default monthly limit must not exceed max monthly limit"
}).refine(data => data.defaultDailyLimit <= data.defaultMonthlyLimit, {
  message: "Daily limit must not exceed monthly limit"
});