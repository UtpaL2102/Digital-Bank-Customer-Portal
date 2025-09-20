import { z } from "zod";

export const RegisterSchema = z.object({
name: z.string().min(2),
email: z.string().email(),
phone_number: z.string().min(7).max(20).optional(),
password: z.string().min(8)
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
identifier: z.string().min(3), // email or netbanking_id
password: z.string().min(8)
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const EnableMfaSchema = z.object({}); // no body
export const VerifyMfaSchema = z.object({
  temp_secret_id: z.string().optional(),
  code: z.string().min(4)
});
export const DisableMfaSchema = z.object({
  password: z.string(),
  code: z.string().min(4)
});
export const LoginVerifySchema = z.object({
  temp_login_token: z.string().optional(),
  identifier: z.string().optional(),
  password: z.string().optional(),
  code: z.string().min(4)
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(50),
  phone_number: z.string().min(7).max(20).optional(),
});