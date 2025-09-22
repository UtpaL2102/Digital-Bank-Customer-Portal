import { Request } from 'express';
import { ApiResponse } from './api';

export type StatementFormat = 'PDF' | 'CSV';
export type StatementDelivery = 'download' | 'email';
export type StatementStatus = 'processing' | 'completed' | 'failed';

export interface Statement {
  id: string;
  user_id: string;
  account_id: string;
  date_from: Date;
  date_to: Date;
  format: StatementFormat;
  delivery: StatementDelivery;
  status: StatementStatus;
  file_url?: string | null;
  created_at: Date;
  updated_at?: Date;
  account?: {
    account_number: string;
    account_type: string;
  };
}

export interface StatementListQuery {
  accountId?: string;
}

export interface GenerateStatementBody {
  account_id: string;
  date_from: string;
  date_to: string;
  format?: StatementFormat;
  delivery?: StatementDelivery;
}

export interface StatementParams {
  statementId: string;
}

export interface StatementListResponse extends ApiResponse {
  statements?: Statement[];
  error?: {
    code: string;
    message: string;
  };
}

export interface StatementResponse extends ApiResponse {
  statement?: Statement;
  error?: {
    code: string;
    message: string;
  };
}

// Type-safe request types
export interface ListStatementsRequest extends Request {
  query: StatementListQuery;
  user: { id: string };
}

export interface GenerateStatementRequest extends Request {
  body: GenerateStatementBody;
  user: { id: string };
}

export interface GetStatementRequest extends Request {
  params: StatementParams;
  user: { id: string };
}