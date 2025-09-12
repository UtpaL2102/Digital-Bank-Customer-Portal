import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from "dotenv";
import { prisma } from "./db/prismaClient.js";
// import { errorHandler } from '@digital-bank/common/errors.js';
import { apiLimiter, authLimiter, transferLimiter, adminLimiter } from './middlewares/rate.limit.js';
import { requestLogger } from './middlewares/request.logger.js';
import { HealthResponse, TransferHealthResponse, ErrorResponse } from './types/health.js';

dotenv.config({ override: true });
const app: Application = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN, credentials: true }));
app.use(express.json());

// Request logging
app.use(requestLogger);

// Apply rate limiting
app.use(apiLimiter); // General rate limit for all routes
app.use('/auth', authLimiter); // Stricter limit for auth routes
app.use('/transfer', transferLimiter); // Limit for transfer routes
app.use('/admin', adminLimiter); // Limit for admin routes

// Routes
import accountRoutes from './routes/accounts.routes.js';
import statementRoutes from './routes/statements.routes.js';
import beneficiaryRoutes from './routes/beneficiaries.routes.js';
import transferRoutes from './routes/transfers.routes.js';
import adminRoutes from './routes/admin.routes.js';
import adminLimitsRoutes from './routes/admin.limits.routes.js';
import adminMonitoringRoutes from './routes/admin.monitoring.routes.js';
import adminConfigRoutes from './routes/admin.config.routes.js';

app.use('/', accountRoutes);
app.use('/', statementRoutes);
app.use('/', beneficiaryRoutes);
app.use('/', transferRoutes);
app.use('/', adminRoutes);
app.use('/admin', adminLimitsRoutes);
app.use('/admin/monitoring', adminMonitoringRoutes);
app.use('/admin/config', adminConfigRoutes);
// Health
app.get("/healthz", (_req: Request, res: Response<HealthResponse>) => res.status(200).send("ok"));
app.get("/readyz", async (_req: Request, res: Response<HealthResponse>) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send("ready");
  } catch {
    res.status(500).send("db not ready");
  }
});

// Monitor scheduled transfers
app.get("/health/transfers", async (_req: Request, res: Response<TransferHealthResponse | ErrorResponse>) => {
  try {
    const pendingCount = await prisma.transaction.count({
      where: {
        type: 'transfer',
        status: 'scheduled',
        next_run_at: {
          lte: new Date()
        }
      }
    });

    const recentFailures = await prisma.transaction.findMany({
      where: {
        type: 'transfer',
        status: 'failed',
        completed_at: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      select: {
        id: true,
        error_message: true,
        completed_at: true
      }
    });

    res.json({
      pending_transfers: pendingCount,
      recent_failures: recentFailures,
      status: pendingCount === 0 ? 'healthy' : 'backlog'
    } satisfies TransferHealthResponse);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to check transfer health',
      details: error instanceof Error ? error.message : 'Unknown error'
    } satisfies ErrorResponse);
  }
});

// app.use(errorHandler);

export { app };
