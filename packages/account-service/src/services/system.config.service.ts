import { PrismaClient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

interface ConfigUpdateData {
  value: string;
  description?: string;
  category?: string;
  last_updated_by: string;
  is_active?: boolean;
  max_retry_attempts?: number;
  processing_time_threshold?: number;
  error_rate_threshold?: number;
  warning_threshold?: number;
  default_daily_limit?: number;
  default_monthly_limit?: number;
  max_daily_limit?: number;
  max_monthly_limit?: number;
}

@injectable()
export class SystemConfigService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async getConfig(key: string) {
    return this.prisma.systemConfig.findUnique({
      where: { key }
    });
  }

  async getAllConfigs(category?: string) {
    return this.prisma.systemConfig.findMany({
      where: category ? { category } : undefined,
      orderBy: [
        { category: 'asc' },
        { key: 'asc' }
      ]
    });
  }

  async updateConfig(key: string, data: ConfigUpdateData) {
    return this.prisma.systemConfig.update({
      where: { key },
      data: {
        ...data,
        last_updated_at: new Date()
      }
    });
  }

  async setMonitoringThresholds({
    maxRetryAttempts,
    processingTimeThreshold,
    errorRateThreshold,
    warningThreshold,
    updatedBy
  }: {
    maxRetryAttempts?: number;
    processingTimeThreshold?: number;
    errorRateThreshold?: number;
    warningThreshold?: number;
    updatedBy: string;
  }) {
    const updates = [];

    if (maxRetryAttempts !== undefined) {
      updates.push(
        this.updateConfig('max_retry_attempts', {
          value: maxRetryAttempts.toString(),
          category: 'monitoring',
          last_updated_by: updatedBy,
          max_retry_attempts: maxRetryAttempts
        })
      );
    }

    if (processingTimeThreshold !== undefined) {
      updates.push(
        this.updateConfig('processing_time_threshold', {
          value: processingTimeThreshold.toString(),
          category: 'monitoring',
          last_updated_by: updatedBy,
          processing_time_threshold: processingTimeThreshold
        })
      );
    }

    if (errorRateThreshold !== undefined) {
      updates.push(
        this.updateConfig('error_rate_threshold', {
          value: errorRateThreshold.toString(),
          category: 'monitoring',
          last_updated_by: updatedBy,
          error_rate_threshold: errorRateThreshold
        })
      );
    }

    if (warningThreshold !== undefined) {
      updates.push(
        this.updateConfig('warning_threshold', {
          value: warningThreshold.toString(),
          category: 'monitoring',
          last_updated_by: updatedBy,
          warning_threshold: warningThreshold
        })
      );
    }

    await Promise.all(updates);
  }

  async setDefaultLimits({
    defaultDailyLimit,
    defaultMonthlyLimit,
    maxDailyLimit,
    maxMonthlyLimit,
    updatedBy
  }: {
    defaultDailyLimit?: number;
    defaultMonthlyLimit?: number;
    maxDailyLimit?: number;
    maxMonthlyLimit?: number;
    updatedBy: string;
  }) {
    const updates = [];

    if (defaultDailyLimit !== undefined) {
      updates.push(
        this.updateConfig('default_daily_limit', {
          value: defaultDailyLimit.toString(),
          category: 'limits',
          last_updated_by: updatedBy,
          default_daily_limit: defaultDailyLimit
        })
      );
    }

    if (defaultMonthlyLimit !== undefined) {
      updates.push(
        this.updateConfig('default_monthly_limit', {
          value: defaultMonthlyLimit.toString(),
          category: 'limits',
          last_updated_by: updatedBy,
          default_monthly_limit: defaultMonthlyLimit
        })
      );
    }

    if (maxDailyLimit !== undefined) {
      updates.push(
        this.updateConfig('max_daily_limit', {
          value: maxDailyLimit.toString(),
          category: 'limits',
          last_updated_by: updatedBy,
          max_daily_limit: maxDailyLimit
        })
      );
    }

    if (maxMonthlyLimit !== undefined) {
      updates.push(
        this.updateConfig('max_monthly_limit', {
          value: maxMonthlyLimit.toString(),
          category: 'limits',
          last_updated_by: updatedBy,
          max_monthly_limit: maxMonthlyLimit
        })
      );
    }

    await Promise.all(updates);
  }

  async getMonitoringThresholds() {
    const configs = await this.prisma.systemConfig.findMany({
      where: {
        category: 'monitoring',
        is_active: true
      }
    });

    return {
      maxRetryAttempts: Number(configs.find(c => c.key === 'max_retry_attempts')?.value || 3),
      processingTimeThreshold: Number(configs.find(c => c.key === 'processing_time_threshold')?.value || 30000),
      errorRateThreshold: Number(configs.find(c => c.key === 'error_rate_threshold')?.value || 0.05),
      warningThreshold: Number(configs.find(c => c.key === 'warning_threshold')?.value || 0.10)
    };
  }

  async getDefaultLimits() {
    const configs = await this.prisma.systemConfig.findMany({
      where: {
        category: 'limits',
        is_active: true
      }
    });

    return {
      defaultDailyLimit: Number(configs.find(c => c.key === 'default_daily_limit')?.value || 100000),
      defaultMonthlyLimit: Number(configs.find(c => c.key === 'default_monthly_limit')?.value || 1000000),
      maxDailyLimit: Number(configs.find(c => c.key === 'max_daily_limit')?.value || 500000),
      maxMonthlyLimit: Number(configs.find(c => c.key === 'max_monthly_limit')?.value || 5000000)
    };
  }
}