import { Router, Response } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';
import { validateAccountLimits } from '../middlewares/admin.validation.js';
import { prisma } from '../db/prismaClient.js';
import {
  GetTransferLimitsRequest,
  GetTransferLimitsResponse,
  UpdateAccountLimitsRequest,
  UpdateAccountLimitsResponse,
  UpdateAccountLimitsParams,
  GetTransferStatsRequest,
  GetTransferStatsResponse
} from '../types/admin.limits.js';

const router: Router = Router();

router.use(requireAuth);
router.use(requireAdmin);

// Get system-wide transfer limits
router.get('/transfer-limits', async (_req: GetTransferLimitsRequest, res: Response<GetTransferLimitsResponse>) => {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        account_number: true,
        daily_limit: true,
        monthly_limit: true,
        status: true,
        user_id: true
      }
    });

    res.json({ accounts });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve transfer limits'
      }
    });
  }
});

// Update account limits
router.put<UpdateAccountLimitsParams, UpdateAccountLimitsResponse, { dailyLimit: any; monthlyLimit: any }, {}>(
  '/accounts/:accountId/limits',
  validateAccountLimits,
  async (req: UpdateAccountLimitsRequest, res: Response<UpdateAccountLimitsResponse>) => {
  try {
    const { accountId } = req.params;
    const { dailyLimit, monthlyLimit } = req.body;

    const account = await prisma.account.update({
      where: { id: accountId },
      data: {
        daily_limit: dailyLimit,
        monthly_limit: monthlyLimit,
        updated_at: new Date()
      }
    });

    res.json({ account });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update transfer limits'
      }
    });
  }
});

// Get transfer statistics
router.get<{}, GetTransferStatsResponse, {}, { from?: string; to?: string }>(
  '/transfer-stats',
  async (req: GetTransferStatsRequest, res: Response<GetTransferStatsResponse>) => {
  try {
    const { from, to } = req.query;
    const fromDate = from ? new Date(from as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Last 30 days by default
    const toDate = to ? new Date(to as string) : new Date();

    const stats = await prisma.transaction.groupBy({
      by: ['status'],
      where: {
        type: 'TRANSFER',
        created_at: {
          gte: fromDate,
          lte: toDate
        }
      },
      _count: true,
      _sum: {
        amount: true
      }
    });

    res.json({ stats });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve transfer statistics'
      }
    });
  }
});

export default router;