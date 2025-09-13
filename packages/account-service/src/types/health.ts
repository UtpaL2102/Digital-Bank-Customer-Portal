import { Transaction } from '@prisma/client';

export interface TransferHealthResponse {
  pending_transfers: number;
  recent_failures: Pick<Transaction, 'id' | 'error_message' | 'completed_at'>[];
  status: 'healthy' | 'backlog';
}

export interface TransferFailure {
  id: string;
  error_message: string | null;
  completed_at: Date | null;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export type HealthResponse = 'ok' | 'ready' | 'db not ready';