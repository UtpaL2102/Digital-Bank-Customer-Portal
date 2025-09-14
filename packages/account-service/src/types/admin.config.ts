import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { z } from 'zod';
import { MonitoringThresholdsSchema, DefaultLimitsSchema } from '../schemas/admin.monitoring.schemas.js';

export type SystemConfig = {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
  last_updated_at: Date;
  last_updated_by: string;
  is_active: boolean;
  maxRetryAttempts?: number;
  processingTimeThreshold?: number;
  errorRateThreshold?: number;
  warningThreshold?: number;
  defaultDailyLimit?: number;
  defaultMonthlyLimit?: number;
  maxDailyLimit?: number;
  maxMonthlyLimit?: number;
};

// Common error response type
export type AdminConfigErrorResponse = {
  status: 'error';
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

// Get all configurations
export interface GetConfigsRequest extends Request<
  ParamsDictionary,
  GetConfigsResponse | AdminConfigErrorResponse,
  never,
  { category?: string }
> {
  user?: { id: string; role: string; status: string; };
}

export type GetConfigsResponse = SystemConfig[];

// Monitoring Thresholds
export type MonitoringThresholds = {
  maxRetryAttempts: number;
  processingTimeThreshold: number;
  errorRateThreshold: number;
  warningThreshold: number;
};

export interface GetMonitoringThresholdsRequest extends Request<
  ParamsDictionary,
  GetMonitoringThresholdsResponse | AdminConfigErrorResponse,
  never,
  never
> {
  user?: { id: string; role: string; status: string; };
}

export type GetMonitoringThresholdsResponse = MonitoringThresholds;

export interface UpdateMonitoringThresholdsRequest extends Request<
  ParamsDictionary,
  UpdateMonitoringThresholdsResponse | AdminConfigErrorResponse,
  MonitoringThresholds,
  never
> {
  user?: { id: string; role: string; status: string; };
  headers: {
    'x-user-id'?: string;
    [key: string]: string | string[] | undefined;
  };
}

export type UpdateMonitoringThresholdsResponse = {
  status: 'success';
  message: string;
  data: MonitoringThresholds;
};

// Default Limits
export type DefaultLimits = {
  defaultDailyLimit: number;
  defaultMonthlyLimit: number;
  maxDailyLimit: number;
  maxMonthlyLimit: number;
};

export interface GetDefaultLimitsRequest extends Request<
  ParamsDictionary,
  GetDefaultLimitsResponse | AdminConfigErrorResponse,
  never,
  never
> {
  user?: { id: string; role: string; status: string; };
}

export type GetDefaultLimitsResponse = DefaultLimits;

export interface UpdateDefaultLimitsRequest extends Request<
  ParamsDictionary,
  UpdateDefaultLimitsResponse | AdminConfigErrorResponse,
  DefaultLimits,
  never
> {
  user?: { id: string; role: string; status: string; };
  headers: {
    'x-user-id'?: string;
    [key: string]: string | string[] | undefined;
  };
}

export type UpdateDefaultLimitsResponse = {
  message: string;
};