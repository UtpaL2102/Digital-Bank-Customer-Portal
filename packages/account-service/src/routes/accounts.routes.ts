import { Router, Request, Response } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { listAccounts, getAccount, listTransactions, getTransaction } from '../controllers/accounts.controller.js';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

import type { 
  AccountsRequest, 
  AccountRequest, 
  TransactionsRequest, 
  TransactionRequest,
  AccountsResponse,
  AccountResponse,
  TransactionsResponse,
  TransactionResponse,
  AccountsQuery,
  AccountParams,
  TransactionsQuery,
  TransactionParams
} from '../types/accounts.js';

const router: Router = Router();

// All routes require authentication
router.use(requireAuth);

// Account routes
router.get<{}, AccountsResponse, {}, AccountsQuery>('/accounts', listAccounts);
router.get<AccountParams, AccountResponse>('/accounts/:accountId', getAccount);

// Transaction routes
router.get<{}, TransactionsResponse, {}, TransactionsQuery>('/transactions', listTransactions);
router.get<TransactionParams, TransactionResponse>('/transactions/:transactionId', getTransaction);

export default router;