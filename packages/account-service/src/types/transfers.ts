import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export type TransferStatus = 'PENDING' | 'COMPLETED' | 'SCHEDULED' | 'CANCELLED' | 'FAILED';

export interface Transfer {
  id: string;
  from_account_id: string;
  type: string;
  amount: number;
  description?: string | null;
  to_beneficiary_id?: string | null;
  status: TransferStatus;
  next_run_at?: Date | null;
  idempotency_key?: string | null;
  initiated_by: string;
  created_at: Date;
  updated_at?: Date;
  toBeneficiary?: {
    id: string;
    name: string;
    bank_name: string | null;
    account_number: string;
  } | null;
  fromAccount?: {
    id: string;
    account_number: string;
    balance: number;
  };
}

export interface TransferCreateInput {
  beneficiaryId: string;
  amount: number;
  description?: string;
  scheduledDate?: string;
  idempotencyKey?: string;
}

export interface TransferParams {
  transferId: string;
}

export type TransferSuccessResponse = {
  transfer: Transfer;
};

export type TransferListSuccessResponse = {
  transfers: Transfer[];
};

export type TransferErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type TransferResponse = TransferSuccessResponse | TransferErrorResponse;
export type TransferListResponse = TransferListSuccessResponse | TransferErrorResponse;

// Type-safe request types
export interface InitiateTransferRequest extends Request<ParamsDictionary, any, TransferCreateInput, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface GetScheduledTransfersRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface CancelScheduledTransferRequest extends Request<TransferParams, any, any, ParsedQs> {
  user: { id: string; role: string; status: string; };
}