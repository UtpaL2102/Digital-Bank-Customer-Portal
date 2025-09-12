import { Response } from 'express';
import { prisma } from '../db/prismaClient.js';
import { v4 as uuidv4 } from 'uuid';
import {
  InitiateTransferRequest,
  GetScheduledTransfersRequest,
  CancelScheduledTransferRequest,
  TransferResponse,
  TransferListResponse,
  TransferStatus
} from '../types/transfers.js';

export const initiateTransfer = async (req: InitiateTransferRequest, res: Response<TransferResponse>) => {
  const userId = (req as any).user.id;
  const { 
    beneficiaryId, 
    amount, 
    description, 
    scheduledDate,
    idempotencyKey = uuidv4()
  } = req.body;

  try {
    // Check for duplicate transaction using idempotency key
  const existingTransaction = await prisma.transaction.findFirst({
      where: { idempotency_key: idempotencyKey }
    });

    if (existingTransaction) {
      return res.status(409).json({
        error: {
          code: 'DUPLICATE_TRANSACTION',
          message: 'This transaction has already been processed'
        }
      });
    }

    // Verify beneficiary exists and belongs to user
    const beneficiary = await prisma.beneficiary.findFirst({
      where: {
        id: beneficiaryId,
        user_id: userId,
        is_active: true
      }
    });

    if (!beneficiary) {
      return res.status(404).json({
        error: {
          code: 'BENEFICIARY_NOT_FOUND',
          message: 'Beneficiary not found or inactive'
        }
      });
    }

    // Get user's account
    const account = await prisma.account.findFirst({
      where: { user_id: userId }
    });

    if (!account) {
      return res.status(404).json({
        error: {
          code: 'ACCOUNT_NOT_FOUND',
          message: 'Account not found'
        }
      });
    }

    // Check sufficient balance
    const currentBalance = typeof account.balance === 'object' && 'toNumber' in account.balance 
      ? account.balance.toNumber() 
      : Number(account.balance);
      
    if (currentBalance < amount) {
      return res.status(400).json({
        error: {
          code: 'INSUFFICIENT_FUNDS',
          message: 'Insufficient funds for transfer'
        }
      });
    }

    // Create transfer record
    const transfer = await prisma.$transaction(async (tx) => {
      // Deduct amount from user's account
      const updatedAccount = await tx.account.update({
        where: { id: account.id },
        data: { balance: { decrement: amount } }
      });

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          from_account_id: account.id,
          type: 'TRANSFER',
          amount: -amount,
          description,
          to_beneficiary_id: beneficiaryId,
          status: (scheduledDate ? 'SCHEDULED' : 'COMPLETED') as TransferStatus,
          next_run_at: scheduledDate,
          idempotency_key: idempotencyKey,
          initiated_by: userId
        }
      });

      return transaction;
    });

    // Convert Decimal fields to number and assert types
    const transferObj = {
      id: transfer.id,
      from_account_id: transfer.from_account_id,
      type: transfer.type,
      amount: typeof transfer.amount === 'object' && 'toNumber' in transfer.amount ? transfer.amount.toNumber() : transfer.amount,
      description: transfer.description,
      to_beneficiary_id: transfer.to_beneficiary_id,
      status: transfer.status as TransferStatus,
      next_run_at: transfer.next_run_at,
      idempotency_key: transfer.idempotency_key,
      initiated_by: transfer.initiated_by,
      created_at: transfer.created_at
    };
    return res.status(201).json({ transfer: transferObj });
  } catch (error) {
    console.error('initiateTransfer error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to process transfer'
      }
    });
  }
};

export const getScheduledTransfers = async (req: GetScheduledTransfersRequest, res: Response<TransferListResponse>) => {
  try {
    const userId = (req as any).user.id;
    
  const transfers = await prisma.transaction.findMany({
      where: {
        fromAccount: { user_id: userId },
        type: 'TRANSFER',
        status: 'SCHEDULED',
        next_run_at: { not: null }
      },
      include: {
        toBeneficiary: true,
        fromAccount: true
      },
      orderBy: {
        next_run_at: 'asc'
      }
    });

    // Convert Decimal fields to number and assert types for each transfer
    const transfersObj = transfers.map((t) => ({
      id: t.id,
      from_account_id: t.from_account_id,
      type: t.type,
      amount: typeof t.amount === 'object' && 'toNumber' in t.amount ? t.amount.toNumber() : t.amount,
      description: t.description,
      to_beneficiary_id: t.to_beneficiary_id,
      status: t.status as TransferStatus,
      next_run_at: t.next_run_at,
      idempotency_key: t.idempotency_key,
      initiated_by: t.initiated_by,
      created_at: t.created_at,
      fromAccount: t.fromAccount
        ? {
            id: t.fromAccount.id,
            account_number: t.fromAccount.account_number,
            balance: typeof t.fromAccount.balance === 'object' && 'toNumber' in t.fromAccount.balance
              ? t.fromAccount.balance.toNumber()
              : t.fromAccount.balance,
          }
        : undefined,
      toBeneficiary: t.toBeneficiary
        ? {
            id: t.toBeneficiary.id,
            name: t.toBeneficiary.name,
            bank_name: t.toBeneficiary.bank_name,
            account_number: t.toBeneficiary.account_number
          }
        : null
    }));
    return res.json({ transfers: transfersObj });
  } catch (error) {
    console.error('getScheduledTransfers error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve scheduled transfers'
      }
    });
  }
};

export const cancelScheduledTransfer = async (req: CancelScheduledTransferRequest, res: Response<TransferResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { transferId } = req.params;

  const transfer = await prisma.transaction.findFirst({
      where: {
        id: transferId,
        fromAccount: { user_id: userId },
        type: 'TRANSFER',
        status: 'SCHEDULED'
      }
    });

    if (!transfer) {
      return res.status(404).json({
        error: {
          code: 'TRANSFER_NOT_FOUND',
          message: 'Scheduled transfer not found'
        }
      });
    }

    await prisma.transaction.update({
      where: { id: transferId },
      data: { status: 'CANCELLED' }
    });

    return res.status(204).send();
  } catch (error) {
    console.error('cancelScheduledTransfer error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to cancel transfer'
      }
    });
  }
};