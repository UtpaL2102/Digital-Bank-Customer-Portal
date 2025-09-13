// src/controllers/transactions.controller.ts
import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

type Q = {
  accountId?: string;
  page?: string;
  pageSize?: string;
  type?: string;
  status?: string;
  from?: string;
  to?: string;
  sort?: string;
};

function formatTxn(txn: any) {
  return {
    ...txn,
    amount: txn.amount?.toString?.() ?? txn.amount,
    created_at: txn.created_at,
    // include nested relations as-is, but convert nested decimals if any
    fromAccount: txn.fromAccount ? {
      id: txn.fromAccount.id,
      account_number: txn.fromAccount.account_number,
      account_type: txn.fromAccount.account_type,
      user_id: txn.fromAccount.user_id,
    } : null,
    toAccount: txn.toAccount ? {
      id: txn.toAccount.id,
      account_number: txn.toAccount.account_number,
      account_type: txn.toAccount.account_type,
      user_id: txn.toAccount.user_id,
    } : null,
    toBeneficiary: txn.toBeneficiary ? {
      id: txn.toBeneficiary.id,
      name: txn.toBeneficiary.name,
      account_number: txn.toBeneficiary.account_number,
    } : null,
  };
}

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const q = req.query as unknown as Q;
    const page = Math.max(1, parseInt(q.page || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(q.pageSize || "20", 10)));
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build base where; we want transactions where the account is either from or to
    const where: any = {};

    // If accountId provided: ensure account belongs to user, then restrict by accountId (from OR to)
    if (q.accountId) {
      // verify ownership
      const acct = await prisma.account.findFirst({ where: { id: q.accountId, user_id: userId } });
      if (!acct) return res.status(403).json({ error: "Forbidden" });

      where.OR = [
        { from_account_id: q.accountId },
        { to_account_id: q.accountId }
      ];
    } else {
      // collect user's account ids and restrict to txns where from OR to is in that set
      const accounts = await prisma.account.findMany({ where: { user_id: userId }, select: { id: true } });
      const accountIds = accounts.map(a => a.id);
      if (accountIds.length === 0) {
        return res.json({ transactions: [], meta: { total: 0, page, pageSize, totalPages: 0 } });
      }
      where.OR = [
        { from_account_id: { in: accountIds } },
        { to_account_id: { in: accountIds } }
      ];
    }

    if (q.type) where.type = q.type;
    if (q.status) where.status = q.status;

    if (q.from || q.to) {
      where.created_at = {};
      if (q.from) where.created_at.gte = new Date(q.from);
      if (q.to) where.created_at.lte = new Date(q.to);
    }

    // Sorting
    let orderBy: any = { created_at: "desc" };
    if (q.sort) {
      const [field, dir] = q.sort.split(".");
      orderBy = { [field]: dir === "asc" ? "asc" : "desc" };
    }

    const total = await prisma.transaction.count({ where });

    const txns = await prisma.transaction.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        fromAccount: { select: { id: true, account_number: true, account_type: true, user_id: true } },
        toAccount: { select: { id: true, account_number: true, account_type: true, user_id: true } },
        toBeneficiary: { select: { id: true, name: true, account_number: true } },
      },
    });

    return res.json({
      transactions: txns.map(formatTxn),
      meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (err) {
    console.error("listTransactions error:", err);
    return res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { transactionId } = req.params;

    const txn = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        fromAccount: { select: { id: true, user_id: true, account_number: true, account_type: true } },
        toAccount: { select: { id: true, user_id: true, account_number: true, account_type: true } },
        toBeneficiary: { select: { id: true, name: true, account_number: true } },
      },
    });

    if (!txn) return res.status(404).json({ error: "Transaction not found" });

    // Ownership check: user must be owner of either fromAccount OR toAccount
    const ownerMatch =
      (txn.fromAccount && txn.fromAccount.user_id === userId) ||
      (txn.toAccount && txn.toAccount.user_id === userId);

    if (!ownerMatch) {
      return res.status(403).json({ error: "Forbidden" });
    }

    return res.json({ transaction: formatTxn(txn) });
  } catch (err) {
    console.error("getTransaction error:", err);
    return res.status(500).json({ error: "Failed to retrieve transaction" });
  }
};
