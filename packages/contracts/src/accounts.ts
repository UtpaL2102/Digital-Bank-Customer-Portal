import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string(),
  type: z.string(),
  balance: z.number(),
  currency: z.string(),
  ownerId: z.string(),
});
export type AccountDto = z.infer<typeof AccountSchema>;

export const AccountsListSchema = z.object({
  accounts: z.array(AccountSchema),
});
export type AccountsListDto = z.infer<typeof AccountsListSchema>;
