import { z } from "zod";

export const KycDocUploadSchema = z.object({
doc_kind: z.enum(["id_front","id_back","address_proof","selfie"])
});

export const KycSubmitSchema = z.object({
document_type: z.string(),
document_number: z.string(),
issue_date: z.string().optional(), // ISO date
expiry_date: z.string().optional(),
address_line1: z.string().min(3),
city: z.string().min(2),
state: z.string().min(2),
postal_code: z.string().min(3),
dob: z.string().optional()
});

export const AdminApproveSchema = z.object({
score: z.number().min(0).max(1).optional(),
note: z.string().max(1000).optional()
});

export const AdminRejectSchema = z.object({
reason: z.enum([
"DOCUMENT_UNREADABLE",
"MISMATCH_NAME_DOB",
"EXPIRED_DOCUMENT",
"ADDRESS_MISMATCH",
"FACE_MISMATCH",
"INCOMPLETE_SUBMISSION",
"SUSPICIOUS_ACTIVITY",
"OTHER"
]),
note: z.string().max(1000).optional()
});