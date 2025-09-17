import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from "dotenv";
import { prisma } from "./db/prismaClient";
import { errorHandler } from '../../common/src/errors';
import authRouter from "./routes/auth.routes";
import kycRouter from "./routes/kyc.routes";
import adminRouter from "./routes/admin.routes.js";
import notificationRouter from "./routes/notification.routes.js";

dotenv.config({ override: true });
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());

app.use(adminRouter);
// TODO: Add routes
app.use(authRouter);
app.use(kycRouter);
app.use(notificationRouter);
// Multer error mapper
app.use((err: any, _req: any, res: any, _next: any) => {
if (err?.message === "LIMIT_FILE_SIZE") {
return res.status(413).json({ error: { code: "FILE_TOO_LARGE", message: "Max allowed size is 1 MB" } });
}
if (err?.message === "UNSUPPORTED_FILE_TYPE") {
return res.status(400).json({ error: { code: "UNSUPPORTED_FILE_TYPE", message: "Only JPG/PNG/PDF allowed" } });
}
if (err?.message === "INVALID_DOC_KIND") {
return res.status(400).json({ error: { code: "INVALID_DOC_KIND", message: "doc_kind invalid" } });
}
return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
});
// Generic error mapper
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: { code: err.code || "INTERNAL_ERROR", message: err.message || "Unexpected error" }});
});

app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/readyz", async (_req, res) => {
try { await prisma.$queryRaw`SELECT 1`; res.send("ready"); }
catch { res.status(500).send("db not ready"); }
});

app.use(errorHandler);

export { app };
