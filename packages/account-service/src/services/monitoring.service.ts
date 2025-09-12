import { PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

@injectable()
export class MonitoringService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async createMonitoringRecord(
    intervalStart: Date, 
    intervalEnd: Date,
    customData?: { type: string; data: Record<string, any> }
  ) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        created_at: {
          gte: intervalStart,
          lt: intervalEnd,
        },
      },
    });

    const totalTransfers = transactions.length;
    const successfulTransfers = transactions.filter(t => t.status === 'completed').length;
    const failedTransfers = transactions.filter(t => t.status === 'failed').length;
    const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

    // Calculate processing times for completed transactions
    const completedTransactions = transactions.filter(
      t => t.completed_at && t.processing_time
    );
    const avgProcessingTime = completedTransactions.length
      ? Math.round(
          completedTransactions.reduce((sum, t) => sum + t.processing_time!, 0) /
            completedTransactions.length
        )
      : 0;
    const maxProcessingTime = completedTransactions.length
      ? Math.max(...completedTransactions.map(t => t.processing_time!))
      : 0;

    // Count errors and warnings
    const errorCount = transactions.filter(t => t.monitoring_status === 'error').length;
    const warningCount = transactions.filter(t => t.monitoring_status === 'warning').length;

    // Find most common error
    const errorMap = new Map<string, number>();
    transactions
      .filter(t => t.error_code)
      .forEach(t => {
        const count = (errorMap.get(t.error_code!) || 0) + 1;
        errorMap.set(t.error_code!, count);
      });

    let mostCommonError: string | null = null;
    let mostCommonErrorCount = 0;
    errorMap.forEach((count, error) => {
      if (count > mostCommonErrorCount) {
        mostCommonError = error;
        mostCommonErrorCount = count;
      }
    });

    // Determine system health status
    const config = await this.prisma.systemConfig.findFirst({
      where: { category: 'monitoring', is_active: true },
    });

    const errorRate = totalTransfers ? errorCount / totalTransfers : 0;
    const warningRate = totalTransfers ? warningCount / totalTransfers : 0;

    let systemHealthStatus = 'healthy';
    if (errorRate >= Number(config?.error_rate_threshold ?? 0.05)) {
      systemHealthStatus = 'critical';
    } else if (warningRate >= Number(config?.warning_threshold ?? 0.10)) {
      systemHealthStatus = 'degraded';
    }

    return this.prisma.transferMonitoring.create({
      data: {
        interval_start: intervalStart,
        interval_end: intervalEnd,
        total_transfers: totalTransfers,
        successful_transfers: successfulTransfers,
        failed_transfers: failedTransfers,
        total_amount: totalAmount,
        avg_processing_time: avgProcessingTime,
        max_processing_time: maxProcessingTime,
        error_count: errorCount,
        warning_count: warningCount,
        most_common_error: mostCommonError,
        most_common_error_count: mostCommonErrorCount || null,
        system_health_status: systemHealthStatus,
      },
    });
  }

  async getSystemHealth(lookbackHours = 24) {
    const lookbackDate = new Date(Date.now() - lookbackHours * 60 * 60 * 1000);
    
    const monitoringRecords = await this.prisma.transferMonitoring.findMany({
      where: {
        timestamp: {
          gte: lookbackDate,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    if (!monitoringRecords.length) {
      return {
        status: 'unknown',
        message: 'No monitoring data available',
      };
    }

    const latestRecord = monitoringRecords[0];
    const aggregateStats = monitoringRecords.reduce(
      (acc, record) => ({
        totalTransfers: acc.totalTransfers + record.total_transfers,
        successfulTransfers: acc.successfulTransfers + record.successful_transfers,
        failedTransfers: acc.failedTransfers + record.failed_transfers,
        totalErrors: acc.totalErrors + record.error_count,
        totalWarnings: acc.totalWarnings + record.warning_count,
      }),
      {
        totalTransfers: 0,
        successfulTransfers: 0,
        failedTransfers: 0,
        totalErrors: 0,
        totalWarnings: 0,
      }
    );

    return {
      currentStatus: latestRecord.system_health_status,
      lastUpdated: latestRecord.timestamp,
      period: {
        start: lookbackDate,
        end: new Date(),
      },
      stats: {
        ...aggregateStats,
        successRate:
          aggregateStats.totalTransfers > 0
            ? (aggregateStats.successfulTransfers / aggregateStats.totalTransfers) * 100
            : 100,
        avgProcessingTime:
          monitoringRecords.reduce((sum, r) => sum + r.avg_processing_time, 0) /
          monitoringRecords.length,
      },
      mostCommonError: latestRecord.most_common_error,
      mostCommonErrorCount: latestRecord.most_common_error_count,
    };
  }

  async getPerformanceMetrics(startDate: Date, endDate: Date) {
    const records = await this.prisma.transferMonitoring.findMany({
      where: {
        timestamp: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    return {
      timeSeriesData: records.map(record => ({
        timestamp: record.timestamp,
        avgProcessingTime: record.avg_processing_time,
        maxProcessingTime: record.max_processing_time,
        totalTransfers: record.total_transfers,
        successRate:
          (record.successful_transfers / record.total_transfers) * 100,
      })),
      summary: {
        totalTransactions: records.reduce(
          (sum, r) => sum + r.total_transfers,
          0
        ),
        avgProcessingTime:
          records.reduce((sum, r) => sum + r.avg_processing_time, 0) /
          records.length,
        maxProcessingTime: Math.max(
          ...records.map(r => r.max_processing_time)
        ),
        errorRate:
          records.reduce((sum, r) => sum + r.error_count, 0) /
          records.reduce((sum, r) => sum + r.total_transfers, 0),
      },
    };
  }

  async logMonitoringEvent(data: {
    userId: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    details?: string;
    severityLevel?: 'info' | 'warning' | 'error' | 'critical';
    status?: 'success' | 'failure';
    errorDetails?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        user_id: data.userId,
        action: data.action,
        action_type: 'monitoring',
        resource_type: data.resourceType,
        resource_id: data.resourceId,
        details: data.details,
        severity_level: data.severityLevel || 'info',
        status: data.status || 'success',
        error_details: data.errorDetails,
        ip_address: data.ipAddress,
        user_agent: data.userAgent,
      },
    });
  }
}