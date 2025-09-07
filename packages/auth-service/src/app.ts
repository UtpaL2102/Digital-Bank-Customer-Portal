import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from "dotenv";
import { prisma } from "./db/prismaClient";
import { errorHandler } from '../../common/src/errors';
import authRouter from "./routes/auth.routes";

dotenv.config({ override: true });
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());


// TODO: Add routes
app.use(authRouter);
// app.use('/kyc', ...)
// app.use('/notification-prefs', ...)

app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/readyz", async (_req, res) => {
try { await prisma.$queryRaw`SELECT 1`; res.send("ready"); }
catch { res.status(500).send("db not ready"); }
});
app.use(errorHandler);

export { app };
