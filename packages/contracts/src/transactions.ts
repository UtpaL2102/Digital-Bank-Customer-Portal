import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.string(),
  fromAccountId: z.string(),
  toAccountId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  createdAt: z.string(),
});
export type TransactionDto = z.infer<typeof TransactionSchema>;

export const TransferCreateSchema = z.object({
  fromAccountId: z.string(),
  toAccountId: z.string(),
  amount: z.number(),
  currency: z.string(),
  type: z.enum(['internal', 'external']),
  idempotencyKey: z.string().optional(),
});
export type TransferCreateDto = z.infer<typeof TransferCreateSchema>;

export const TransactionsListSchema = z.object({
  transactions: z.array(TransactionSchema),
});
export type TransactionsListDto = z.infer<typeof TransactionsListSchema>;
