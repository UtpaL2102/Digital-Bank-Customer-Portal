import { z } from "zod";

export const RegisterSchema = z.object({
name: z.string().min(2),
email: z.string().email(),
phone_number: z.string().min(7).max(20).optional(),
password: z.string().min(8)
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
email: z.string().email(),
password: z.string().min(8)
});
export type LoginInput = z.infer<typeof LoginSchema>;