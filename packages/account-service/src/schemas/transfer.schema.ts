// packages/account-service/src/schemas/transfer.schema.ts
import { z } from "zod";

export const TransferBody = z.object({
  from_account_id: z.string().uuid(),
  to_account_id: z.string().uuid().optional(),
  to_beneficiary_id: z.string().uuid().optional(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export type TransferBodyT = z.infer<typeof TransferBody>;
