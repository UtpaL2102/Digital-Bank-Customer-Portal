import { Router, Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { prisma } from '../db/prismaClient.js';
import { MonitoringService } from '../services/monitoring.service.js';
import { AdminAuthMiddleware } from '../middleware/admin.auth.js';
import { MonitoringRecordSchema } from '../schemas/admin.monitoring.schemas.js';
import { AuditLog } from '@prisma/client';

// Query parameter interfaces
interface HealthQuery {
  hours?: string;
}

interface MetricsQuery {
  start?: string;
  end?: string;
}

interface AuditLogsQuery {
  page?: string;
  limit?: string;
  severity?: string;
  actionType?: string;
}

// Response interfaces
interface ErrorResponse {
  error: string;
  details?: string;
  code?: string;
}

interface ApiResponse<T> {
  status?: 'success' | 'error';
  data?: T;
  error?: string;
  details?: unknown;
  code?: string;
  metadata?: Record<string, unknown>;
}

interface PaginatedResponse<T> {
  logs: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Type-safe request handlers
type TypedRequestQuery<T> = Request<object, object, object, T>;
type TypedRequestBody<T> = Request<object, object, T>;
type TypedResponse<T> = Response<T | ErrorResponse>;

const router: Router = Router();

// Apply admin authentication middleware to all routes
router.use(AdminAuthMiddleware);

// Get system health status
router.get('/health', async (req: TypedRequestQuery<HealthQuery>, res: TypedResponse<unknown>) => {
  try {
    const hours = req.query.hours ? parseInt(req.query.hours as string) : 24;
    const monitoringService = container.resolve(MonitoringService);
    const healthStatus = await monitoringService.getSystemHealth(hours);
    res.json(healthStatus);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve system health status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get performance metrics for a specific time range
router.get('/metrics', async (req: TypedRequestQuery<MetricsQuery>, res: TypedResponse<unknown>) => {
  try {
    const startDate = req.query.start ? new Date(req.query.start as string) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const endDate = req.query.end ? new Date(req.query.end as string) : new Date();

    const monitoringService = container.resolve(MonitoringService);
    const metrics = await monitoringService.getPerformanceMetrics(startDate, endDate);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve performance metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Manually trigger monitoring record creation
router.post('/monitor', async (req: TypedRequestBody<z.infer<typeof MonitoringRecordSchema>>, res: TypedResponse<ApiResponse<unknown>>) => {
  try {
    const validatedData = MonitoringRecordSchema.parse(req.body);
    const intervalStart = new Date(Date.now() - 60 * 60 * 1000); // Last hour
    const intervalEnd = new Date();
    
    const monitoringService = container.resolve(MonitoringService);
    const record = await monitoringService.createMonitoringRecord(intervalStart, intervalEnd, validatedData);
    res.json({
      status: 'success',
      data: record,
      metadata: {
        intervalStart,
        intervalEnd
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: 'error',
        code: 'VALIDATION_ERROR',
        error: 'Invalid request data',
        details: error.errors
      });
    } else {
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        error: 'Failed to create monitoring record',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
});

// Get audit logs
router.get('/audit-logs', async (req: TypedRequestQuery<AuditLogsQuery>, res: TypedResponse<PaginatedResponse<AuditLog>>) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const severity = req.query.severity as string | undefined;
    const actionType = req.query.actionType as string | undefined;

    const logs = await prisma.auditLog.findMany({
      where: {
        ...(severity && { severity_level: severity }),
        ...(actionType && { action_type: actionType })
      },
      orderBy: {
        performed_at: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    const totalCount = await prisma.auditLog.count({
      where: {
        ...(severity && { severity_level: severity }),
        ...(actionType && { action_type: actionType })
      }
    });

    res.json({
      logs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve audit logs',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;