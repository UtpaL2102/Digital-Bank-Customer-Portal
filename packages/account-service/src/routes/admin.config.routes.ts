import { Router, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { SystemConfigService } from '../services/system.config.service.js';
import { AdminAuthMiddleware } from '../middleware/admin.auth.js';
import { MonitoringThresholdsSchema, DefaultLimitsSchema } from '../schemas/admin.monitoring.schemas.js';
import {
  GetConfigsRequest,
  GetConfigsResponse,
  GetMonitoringThresholdsRequest,
  GetMonitoringThresholdsResponse,
  UpdateMonitoringThresholdsRequest,
  UpdateMonitoringThresholdsResponse,
  GetDefaultLimitsRequest,
  GetDefaultLimitsResponse,
  UpdateDefaultLimitsRequest,
  UpdateDefaultLimitsResponse,
  MonitoringThresholds,
  DefaultLimits,
  AdminConfigErrorResponse
} from '../types/admin.config.js';
// import {
//   GetConfigsRequest,
//   GetConfigsResponse,
//   GetMonitoringThresholdsRequest,
//   GetMonitoringThresholdsResponse,
//   UpdateMonitoringThresholdsRequest,
//   UpdateMonitoringThresholdsResponse,
//   GetDefaultLimitsRequest,
//   GetDefaultLimitsResponse,
//   UpdateDefaultLimitsRequest,
//   UpdateDefaultLimitsResponse,
//   AdminConfigErrorResponse
// } from '../types/admin.config.js';

const router: Router = Router();

// Apply admin authentication middleware to all routes
router.use(AdminAuthMiddleware);

// Get all system configurations
router.get<{}, GetConfigsResponse | AdminConfigErrorResponse, never, { category?: string }>(
  '/',
  async (req: GetConfigsRequest, res: Response<GetConfigsResponse | AdminConfigErrorResponse>) => {
    try {
      const category = req.query.category;
      const configService = container.resolve(SystemConfigService);
      const rawConfigs = await configService.getAllConfigs(category);
      const configs = rawConfigs.map((config: any) => ({
        ...config,
        errorRateThreshold: config.error_rate_threshold ? Number(config.error_rate_threshold) : undefined,
        warningThreshold: config.warning_threshold ? Number(config.warning_threshold) : undefined,
        defaultDailyLimit: config.default_daily_limit ? Number(config.default_daily_limit) : undefined,
        defaultMonthlyLimit: config.default_monthly_limit ? Number(config.default_monthly_limit) : undefined,
        maxDailyLimit: config.max_daily_limit ? Number(config.max_daily_limit) : undefined,
        maxMonthlyLimit: config.max_monthly_limit ? Number(config.max_monthly_limit) : undefined,
      }));
      res.json(configs);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve system configurations',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }
);

// Get monitoring thresholds
router.get<{}, GetMonitoringThresholdsResponse | AdminConfigErrorResponse, never, never>(
  '/monitoring/thresholds',
  async (_req: GetMonitoringThresholdsRequest, res: Response<GetMonitoringThresholdsResponse | AdminConfigErrorResponse>) => {
  try {
    const configService = container.resolve(SystemConfigService);
    const thresholds = await configService.getMonitoringThresholds();
    res.json({
      maxRetryAttempts: thresholds.maxRetryAttempts,
      processingTimeThreshold: thresholds.processingTimeThreshold,
      errorRateThreshold: Number(thresholds.errorRateThreshold),
      warningThreshold: Number(thresholds.warningThreshold)
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve monitoring thresholds',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
});

// Update monitoring thresholds
router.put<{}, UpdateMonitoringThresholdsResponse | AdminConfigErrorResponse, MonitoringThresholds, never>(
  '/monitoring/thresholds',
  async (req: UpdateMonitoringThresholdsRequest, res: Response<UpdateMonitoringThresholdsResponse | AdminConfigErrorResponse>) => {
    try {
      const validatedData = MonitoringThresholdsSchema.parse(req.body);
      const userId = req.headers['x-user-id'];
      
      if (!userId) {
        return res.status(401).json({
          status: 'error',
          error: {
            code: 'UNAUTHORIZED',
            message: 'User ID is required'
          }
        });
      }

      const configService = container.resolve(SystemConfigService);
      await configService.setMonitoringThresholds({
        ...validatedData,
        updatedBy: userId
      });

      res.json({
        status: 'success',
        message: 'Monitoring thresholds updated successfully',
        data: validatedData
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          status: 'error',
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid threshold values',
            details: error.errors
          }
        });
      } else {
        res.status(500).json({
          status: 'error',
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Failed to update monitoring thresholds',
            details: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    }
  }
);

// Get default limits
router.get<{}, GetDefaultLimitsResponse | AdminConfigErrorResponse, never, never>(
  '/limits/defaults',
  async (_req: GetDefaultLimitsRequest, res: Response<GetDefaultLimitsResponse | AdminConfigErrorResponse>) => {
    try {
      const configService = container.resolve(SystemConfigService);
      const limits = await configService.getDefaultLimits();
      res.json({
        defaultDailyLimit: Number(limits.defaultDailyLimit),
        defaultMonthlyLimit: Number(limits.defaultMonthlyLimit),
        maxDailyLimit: Number(limits.maxDailyLimit),
        maxMonthlyLimit: Number(limits.maxMonthlyLimit)
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve default limits',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }
);

// Update default limits
router.put<{}, UpdateDefaultLimitsResponse | AdminConfigErrorResponse, DefaultLimits, never>(
  '/limits/defaults',
  async (req: UpdateDefaultLimitsRequest, res: Response<UpdateDefaultLimitsResponse | AdminConfigErrorResponse>) => {
    try {
      const {
        defaultDailyLimit,
        defaultMonthlyLimit,
        maxDailyLimit,
        maxMonthlyLimit
      } = req.body;

      const userId = req.headers['x-user-id'];
      
      if (!userId) {
        return res.status(401).json({
          status: 'error',
          error: {
            code: 'UNAUTHORIZED',
            message: 'User ID is required'
          }
        });
      }

      const configService = container.resolve(SystemConfigService);
      await configService.setDefaultLimits({
        defaultDailyLimit,
        defaultMonthlyLimit,
        maxDailyLimit,
        maxMonthlyLimit,
        updatedBy: userId
      });

      res.json({ message: 'Default limits updated successfully' });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update default limits',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }
);

export default router;