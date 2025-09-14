// packages/account-service/src/controllers/limits.controller.ts
import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

export const getLimits = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { accountId } = req.query as any;

    if (!accountId) return res.status(400).json({ error: "Missing accountId query param" });

    // verify ownership
    const acct = await prisma.account.findUnique({ where: { id: accountId } });
    if (!acct) return res.status(404).json({ error: "Account not found" });
    if (acct.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    return res.json({
      account_id: acct.id,
      daily_limit: acct.daily_limit ? acct.daily_limit.toString() : null,
      monthly_limit: acct.monthly_limit ? acct.monthly_limit.toString() : null,
    });
  } catch (err) {
    console.error("getLimits error:", err);
    return res.status(500).json({ error: "Failed to retrieve limits" });
  }
};

export const createLimitRequest = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { account_id, requested_daily_limit, requested_monthly_limit, reason } = req.body || {};
    if (!account_id || (requested_daily_limit == null && requested_monthly_limit == null)) {
      return res.status(400).json({ error: "Missing required fields: account_id and requested limits" });
    }

    // verify ownership
    const acct = await prisma.account.findUnique({ where: { id: account_id } });
    if (!acct) return res.status(404).json({ error: "Account not found" });
    if (acct.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    const lr = await prisma.limitRequest.create({
      data: {
        user_id: userId,
        account_id,
        current_daily_limit: acct.daily_limit ?? undefined,
        current_monthly_limit: acct.monthly_limit ?? undefined,
        requested_daily_limit: requested_daily_limit ?? undefined,
        requested_monthly_limit: requested_monthly_limit ?? undefined,
        reason: reason ?? null,
        status: "pending",
      },
    });

    return res.status(201).json({ limit_request: lr });
  } catch (err) {
    console.error("createLimitRequest error:", err);
    return res.status(500).json({ error: "Failed to submit limit request" });
  }
};

export const listMyLimitRequests = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const requests = await prisma.limitRequest.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    return res.json({ limit_requests: requests });
  } catch (err) {
    console.error("listMyLimitRequests error:", err);
    return res.status(500).json({ error: "Failed to list limit requests" });
  }
};
