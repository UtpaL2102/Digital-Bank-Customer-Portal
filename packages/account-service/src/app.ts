import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from "dotenv";
import { prisma } from "./db/prismaClient";
import { errorHandler } from '../../common/src/errors';
import accountsRouter from "./routes/account.routes";
import transactionsRouter from "./routes/transaction.routes";
import statementsRouter from "./routes/statement.routes";
import downloadRouter from "./routes/statements.download";
dotenv.config({ override: true });
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());

// TODO: Add routes
// app.use('/accounts', ...)
app.use("/api/v1/accounts", accountsRouter);
// app.use('/transactions', ...)
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/statements", statementsRouter);
app.use(downloadRouter);
// app.use('/limits', ...)
// app.use('/notifications', ...)
// app.use('/healthz', ...)
// Health
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/readyz", async (_req, res) => {
try { await prisma.$queryRaw`SELECT 1`; res.send("ready"); }
catch { res.status(500).send("db not ready"); }
});

app.use(errorHandler);

export { app };
