import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

export const listAccounts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const accounts = await prisma.account.findMany({
      where: { user_id: userId, status: { not: "closed" } },
      include: {
        branch: { select: { name: true, code: true } },
      },
      orderBy: { created_at: "desc" },
    });

    return res.json({ accounts });
  } catch (err) {
    console.error("listAccounts error:", err);
    return res.status(500).json({ error: "Failed to retrieve accounts" });
  }
};

export const getAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { accountId } = req.params;

    const account = await prisma.account.findFirst({
      where: { id: accountId, user_id: userId },
      include: {
        branch: { select: { name: true, code: true } },
      },
    });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    return res.json({ account });
  } catch (err) {
    console.error("getAccount error:", err);
    return res.status(500).json({ error: "Failed to retrieve account" });
  }
};
