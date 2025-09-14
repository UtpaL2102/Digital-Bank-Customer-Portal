import { z } from "zod";

export const CreateScheduledTransfer = z.object({
  from_account_id: z.string().uuid(),
  to_account_id: z.string().uuid().optional(),
  to_beneficiary_id: z.string().uuid().optional(),
  amount: z.number().positive(),
  description: z.string().optional(),
  frequency: z.string().optional(), // monthly/weekly/daily...
  next_run_at: z.string().refine((s)=>!isNaN(Date.parse(s)), { message: "Invalid date" }),
  end_date: z.string().optional(),
  occurrences_left: z.number().int().optional(),
});

export const UpdateScheduledTransfer = z.object({
  amount: z.number().positive().optional(),
  frequency: z.string().optional(),
  next_run_at: z.string().refine((s)=>!isNaN(Date.parse(s)), { message: "Invalid date" }).optional(),
  status: z.string().optional(),
});
