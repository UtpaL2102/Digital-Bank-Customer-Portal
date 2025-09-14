import type { Account, Transaction } from '@prisma/client';
import type { Request } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

export interface AccountsQuery {
  [key: string]: string | undefined;
  status?: string;
  type?: string;
  page?: string;
  limit?: string;
}

export interface TransactionsQuery {
  [key: string]: string | undefined;
  accountId?: string;
  type?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: string;
  limit?: string;
}

export interface AccountParams extends ParamsDictionary {
  accountId: string;
}

export interface TransactionParams extends ParamsDictionary {
  transactionId: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: unknown;
  code?: string;
}

export type AccountsResponse = PaginatedResponse<Account>;
export type AccountResponse = ApiResponse<Account>;
export type TransactionsResponse = PaginatedResponse<Transaction>;
export type TransactionResponse = ApiResponse<Transaction>;

export type AccountsRequest = Request<{}, AccountsResponse, {}, AccountsQuery>;
export type AccountRequest = Request<AccountParams, AccountResponse>;
export type TransactionsRequest = Request<{}, TransactionsResponse, {}, TransactionsQuery>;
export type TransactionRequest = Request<TransactionParams, TransactionResponse>;