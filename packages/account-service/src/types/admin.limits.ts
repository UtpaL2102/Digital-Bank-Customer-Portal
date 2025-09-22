import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Decimal } from '@prisma/client/runtime/library';

// Common Types
export type AdminLimitsErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

// Get Transfer Limits
export interface GetTransferLimitsRequest extends Request {
  user?: { id: string; role: string; status: string; };
}

export type TransferLimitAccount = {
  id: string;
  account_number: string;
  daily_limit: Decimal | null;
  monthly_limit: Decimal | null;
  status: string;
  user_id: string;
};

export type GetTransferLimitsResponse = {
  accounts: TransferLimitAccount[];
} | AdminLimitsErrorResponse;

// Update Account Limits
export type UpdateAccountLimitsParams = ParamsDictionary & {
  accountId: string;
};

export interface UpdateAccountLimitsRequest extends Request<
  UpdateAccountLimitsParams,
  UpdateAccountLimitsResponse,
  { dailyLimit: Decimal; monthlyLimit: Decimal; },
  {}
> {
  user?: { id: string; role: string; status: string; };
}

export type UpdateAccountLimitsResponse = {
  account: {
    id: string;
    daily_limit: Decimal | null;
    monthly_limit: Decimal | null;
    updated_at: Date;
  };
} | AdminLimitsErrorResponse;

// Get Transfer Statistics
export interface GetTransferStatsRequest extends Request<
  {},
  GetTransferStatsResponse,
  {},
  {
    from?: string;
    to?: string;
  }
> {
  user?: { id: string; role: string; status: string; };
}

export type TransferStats = {
  status: string;
  _count: number;
  _sum: {
    amount: Decimal | null;
  };
};

export type GetTransferStatsResponse = {
  stats: TransferStats[];
} | AdminLimitsErrorResponse;