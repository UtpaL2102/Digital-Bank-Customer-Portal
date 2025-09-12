import { Request, Response } from 'express';
import { prisma } from '../db/prismaClient.js';
import { Prisma } from '@prisma/client';

export const listAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated'
        }
      });
    }

    const accounts = await prisma.account.findMany({
      where: {
        user_id: userId,
        status: { not: 'closed' }
      },
      include: {
        branch: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return res.json({ accounts });
  } catch (error) {
    console.error('listAccounts error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve accounts'
      }
    });
  }
};

export const getAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { accountId } = req.params;

    const account = await prisma.account.findFirst({
      where: {
        id: accountId,
        user_id: userId,
      },
      include: {
        branch: {
          select: {
            name: true,
            code: true
          }
        }
      }
    });

    if (!account) {
      return res.status(404).json({
        error: {
          code: 'ACCOUNT_NOT_FOUND',
          message: 'Account not found'
        }
      });
    }

    return res.json({ account });
  } catch (error) {
    console.error('getAccount error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve account details'
      }
    });
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { accountId } = req.query;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    // Validate account ownership
    if (accountId) {
      const account = await prisma.account.findFirst({
        where: { id: accountId as string, user_id: userId }
      });
      if (!account) {
        return res.status(404).json({
          error: {
            code: 'ACCOUNT_NOT_FOUND',
            message: 'Account not found'
          }
        });
      }
    }

    // Build where clause for transactions
    const where: Prisma.TransactionWhereInput = accountId ? {
      OR: [
        { from_account_id: accountId.toString() },
        { to_account_id: accountId.toString() }
      ]
    } : {
      OR: [
        { fromAccount: { user_id: userId } },
        { toAccount: { user_id: userId } }
      ]
    };

    const [transactions, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        include: {
          fromAccount: {
            select: {
              account_number: true,
              account_type: true
            }
          },
          toAccount: {
            select: {
              account_number: true,
              account_type: true
            }
          },
          toBeneficiary: {
            select: {
              name: true,
              bank_name: true,
              account_number: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        },
        skip,
        take: pageSize
      }),
      prisma.transaction.count({ where })
    ]);

    return res.json({
      transactions,
      pagination: {
        total,
        page,
        pageSize,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    console.error('listTransactions error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve transactions'
      }
    });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { transactionId } = req.params;

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        OR: [
          { fromAccount: { user_id: userId } },
          { toAccount: { user_id: userId } }
        ]
      },
      include: {
        fromAccount: {
          select: {
            account_number: true,
            account_type: true,
            branch: {
              select: {
                name: true,
                code: true
              }
            }
          }
        },
        toAccount: {
          select: {
            account_number: true,
            account_type: true,
            branch: {
              select: {
                name: true,
                code: true
              }
            }
          }
        },
        toBeneficiary: {
          select: {
            name: true,
            bank_name: true,
            account_number: true,
            ifsc_swift: true
          }
        }
      }
    });

    if (!transaction) {
      return res.status(404).json({
        error: {
          code: 'TRANSACTION_NOT_FOUND',
          message: 'Transaction not found'
        }
      });
    }

    return res.json({ transaction });
  } catch (error) {
    console.error('getTransaction error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve transaction details'
      }
    });
  }
};