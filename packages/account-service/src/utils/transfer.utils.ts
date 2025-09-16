import { prisma } from '../db/prismaClient.js';
import type { Account, Transaction, Beneficiary } from '@prisma/client';

interface ValidationResult {
  valid: boolean;
  reason?: string;
}

interface TransferLimitResult {
  allowed: boolean;
  reason?: string;
}

// Constants for validation
const TRANSFER_TYPE = 'TRANSFER' as const;
const MAX_FUTURE_DAYS = 90;

/**
 * Checks if a transfer is allowed based on account balance and transfer limits
 * @param accountId - The ID of the account to check
 * @param amount - The amount to transfer (must be positive)
 * @returns Promise resolving to transfer limit validation result
 */
export const checkTransferLimits = async (accountId: string, amount: number): Promise<TransferLimitResult> => {
  // Get account details with today's transactions
  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: {
      fromTxns: {
        where: {
          type: TRANSFER_TYPE,
          created_at: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }
    }
  }) satisfies (Account & { fromTxns: Transaction[] }) | null;

  if (!account) {
    return { allowed: false, reason: 'Account not found' };
  }

  // Check balance
  if (account.balance.toNumber() < amount) {
    return { allowed: false, reason: 'Insufficient funds' };
  }

  // Calculate daily total
  const dailyTotal = account.fromTxns.reduce((sum, tx) => sum + Math.abs(tx.amount.toNumber()), 0);
  if (account.daily_limit && dailyTotal + amount > account.daily_limit.toNumber()) {
    return { allowed: false, reason: 'Daily transfer limit exceeded' };
  }

  // Check monthly limit
  const firstOfMonth = new Date();
  firstOfMonth.setDate(1);
  firstOfMonth.setHours(0, 0, 0, 0);

  const monthlyTransactions = await prisma.transaction.findMany({
    where: {
      from_account_id: accountId,
      type: TRANSFER_TYPE,
      created_at: {
        gte: firstOfMonth
      }
    }
  }) satisfies Transaction[];

  const monthlyTotal = monthlyTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount.toNumber()), 0);
  if (account.monthly_limit && monthlyTotal + amount > account.monthly_limit.toNumber()) {
    return { allowed: false, reason: 'Monthly transfer limit exceeded' };
  }

  return { allowed: true };
};

/**
 * Validates if a scheduled transfer date is valid
 * @param scheduledDate - The date to schedule the transfer for
 * @returns Validation result indicating if the date is valid
 */
export const validateScheduledDate = (scheduledDate: Date): ValidationResult => {
  const now = new Date();
  const maxFutureDate = new Date();
  maxFutureDate.setDate(maxFutureDate.getDate() + MAX_FUTURE_DAYS);

  if (scheduledDate < now) {
    return { valid: false, reason: 'Scheduled date must be in the future' };
  }

  if (scheduledDate > maxFutureDate) {
    return { valid: false, reason: 'Scheduled date cannot be more than 90 days in the future' };
  }

  return { valid: true };
};

/**
 * Checks if a transaction with the given idempotency key already exists
 * @param key - The idempotency key to check
 * @returns Promise resolving to true if transaction exists, false otherwise
 */
export const checkIdempotency = async (key: string): Promise<boolean> => {
  const existingTransaction = await prisma.transaction.findFirst({
    where: { idempotency_key: key }
  });

  return !!existingTransaction;
};

/**
 * Validates if a beneficiary is valid for transfer
 * @param beneficiaryId - The ID of the beneficiary to validate
 * @param userId - The ID of the user who owns the beneficiary
 * @returns Promise resolving to validation result
 */
export const validateBeneficiaryForTransfer = async (beneficiaryId: string, userId: string): Promise<ValidationResult> => {
  const beneficiary = await prisma.beneficiary.findFirst({
    where: {
      id: beneficiaryId,
      user_id: userId,
      is_active: true
    }
  }) satisfies Beneficiary | null;

  if (!beneficiary) {
    return { valid: false, reason: 'Invalid or inactive beneficiary' };
  }

  return { valid: true };
};