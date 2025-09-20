import type { Prisma } from '@prisma/client';
import { prisma } from '../db/prismaClient.js';
import { injectable, inject } from 'tsyringe';
import { checkTransferLimits, validateScheduledDate, checkIdempotency, validateBeneficiaryForTransfer } from '../utils/transfer.utils.js';
import { MonitoringService } from './monitoring.service.js';

export interface TransferRequest {
  fromAccountId: string;
  beneficiaryId: string;
  amount: number;
  description?: string;
  scheduledDate?: Date;
  idempotencyKey: string;
  userId: string;  // Add userId for initiated_by field
}

@injectable()
export class TransferService {
  constructor(
    @inject('MonitoringService')
    private monitoringService: MonitoringService
  ) {}

  private async recordTransferStart(transactionId: string) {
    const updateData: Prisma.TransactionUpdateInput = {
      started_at: new Date(),
      monitoring_status: 'normal'
    };

    await prisma.transaction.update({
      where: { id: transactionId },
      data: updateData
    });
  }

  private async recordTransferCompletion(
    transactionId: string,
    startTime: Date,
    status: 'completed' | 'failed',
    error?: { code: string; message: string }
  ) {
    const now = new Date();
    const processingTime = now.getTime() - startTime.getTime();

    const updateData: any = {
      status,
      completed_at: now,
      processing_time: processingTime
    };

    if (error) {
      updateData.error_code = error.code;
      updateData.error_message = error.message;
      updateData.monitoring_status = 'error';
    }

    await prisma.transaction.update({
      where: { id: transactionId },
      data: updateData
    });
  }

  async executeTransfer(request: TransferRequest) {
    const {
      fromAccountId,
      beneficiaryId,
      amount,
      description,
      scheduledDate,
      idempotencyKey,
      userId
    } = request;

    // Log transfer initiation
    await this.monitoringService.logMonitoringEvent({
      userId,
      action: 'transfer_initiated',
      resourceType: 'transfer',
      details: `Initiated transfer of ${amount} from account ${fromAccountId} to beneficiary ${beneficiaryId}`,
      severityLevel: 'info',
    });

    // Check idempotency
    const isDuplicate = await checkIdempotency(idempotencyKey);
    if (isDuplicate) {
      throw new Error('Duplicate transaction');
    }

    // Validate scheduled date if provided
    if (scheduledDate) {
      const dateValidation = validateScheduledDate(scheduledDate);
      if (!dateValidation.valid) {
        throw new Error(dateValidation.reason);
      }
    }

    // Check transfer limits
    const limitCheck = await checkTransferLimits(fromAccountId, amount);
    if (!limitCheck.allowed) {
      throw new Error(limitCheck.reason);
    }

    // Get account and create transaction
    const result = await prisma.$transaction(async (tx) => {
      // Deduct from source account
      const fromAccount = await tx.account.update({
        where: { id: fromAccountId },
        data: {
          balance: {
            decrement: amount
          }
        }
      });

      const startTime = new Date();
      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          from_account_id: fromAccountId,
          to_beneficiary_id: beneficiaryId,
          amount: -amount,
          description,
          type: 'transfer',
          status: scheduledDate ? 'scheduled' : 'completed',
          idempotency_key: idempotencyKey,
          initiated_by: request.userId,
          started_at: startTime,
          monitoring_status: 'normal',
          processing_time: 0,
          retry_count: 0
        }
      });

      return { fromAccount, transaction };
    });

    return result;
  }

  async getScheduledTransfers(userId: string) {
    return prisma.transaction.findMany({
      where: {
        fromAccount: {
          user_id: userId
        },
        type: 'transfer',
        status: 'scheduled'
      },
      include: {
        toBeneficiary: true
      },
      orderBy: {
        created_at: 'asc'
      }
    });
  }

  async cancelScheduledTransfer(transferId: string, userId: string) {
    // Verify ownership
    const transfer = await prisma.transaction.findFirst({
      where: {
        id: transferId,
        fromAccount: {
          user_id: userId
        },
        type: 'TRANSFER',
        status: 'SCHEDULED'
      }
    });

    if (!transfer) {
      throw new Error('Transfer not found or already processed');
    }

    // Cancel the transfer
    await prisma.transaction.update({
      where: { id: transferId },
      data: {
        status: 'cancelled',
        completed_at: new Date(),
        monitoring_status: 'normal'
      }
    });
  }

  async executeScheduledTransfers() {
    const now = new Date();
    const pendingTransfers = await prisma.transaction.findMany({
      where: {
        type: 'transfer',
        status: 'scheduled',
        next_run_at: {
          lte: now
        }
      },
      include: {
        fromAccount: true
      }
    });

    for (const transfer of pendingTransfers) {
      try {
        const startTime = new Date();
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          // Update source account balance
          await tx.account.update({
            where: { id: transfer.from_account_id },
            data: {
              balance: {
                decrement: Number(transfer.amount)
              }
            }
          });

          // Update transfer status
          await tx.transaction.update({
            where: { id: transfer.id },
            data: {
              status: 'completed',
              completed_at: now,
              processing_time: now.getTime() - startTime.getTime(),
              monitoring_status: 'normal'
            }
          });
        });
      } catch (error) {
        // Mark transfer as failed
        await prisma.transaction.update({
          where: { id: transfer.id },
          data: {
            status: 'failed',
            error_code: 'EXECUTION_ERROR',
            error_message: error instanceof Error ? error.message : 'Transfer execution failed',
            completed_at: now,
            monitoring_status: 'error',
            retry_count: (transfer.retry_count || 0) + 1
          }
        });
      }
    }
  }
}