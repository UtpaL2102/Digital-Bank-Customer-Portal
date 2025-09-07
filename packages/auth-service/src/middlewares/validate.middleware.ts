import { ZodSchema } from "zod";
export const validate =
(schema: ZodSchema) =>
(req: any, res: any, next: any) => {
try {
req.body = schema.parse(req.body);
next();
} catch (e: any) {
return res.status(400).json({ error: { code: "BAD_REQUEST", message: e.errors?.[0]?.message || "Invalid payload" } });
}
};