import { Response } from 'express';
import { prisma } from '../db/prismaClient.js';
import { 
  ListStatementsRequest, 
  GenerateStatementRequest, 
  GetStatementRequest, 
  StatementListResponse, 
  StatementResponse,
  StatementFormat,
  StatementDelivery,
  StatementStatus,
} from '../types/statements.js';

export const listStatements = async (req: ListStatementsRequest, res: Response<StatementListResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { accountId } = req.query;

    // Validate account ownership if accountId is provided
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

    const statements = (await prisma.statement.findMany({
      where: {
        user_id: userId,
        ...(accountId ? { account_id: accountId as string } : {})
      },
      include: {
        account: {
          select: {
            account_number: true,
            account_type: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })).map(stmt => ({
      ...stmt,
      format: stmt.format as StatementFormat,
      delivery: stmt.delivery as StatementDelivery,
      status: stmt.status as StatementStatus
    }));

    return res.json({ statements });
  } catch (error) {
    console.error('listStatements error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve statements'
      }
    });
  }
};

export const generateStatement = async (req: GenerateStatementRequest, res: Response<StatementResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { account_id, date_from, date_to, format = 'PDF', delivery = 'download' } = req.body;

    // Validate required fields
    if (!account_id || !date_from || !date_to) {
      return res.status(400).json({
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing required fields'
        }
      });
    }

    // Validate account ownership
    const account = await prisma.account.findFirst({
      where: { id: account_id, user_id: userId }
    });

    if (!account) {
      return res.status(404).json({
        error: {
          code: 'ACCOUNT_NOT_FOUND',
          message: 'Account not found'
        }
      });
    }

    // Create statement record
    const statement = await prisma.statement.create({
      data: {
        user_id: userId,
        account_id,
        date_from: new Date(date_from),
        date_to: new Date(date_to),
        format: format as StatementFormat,
        delivery: delivery as StatementDelivery,
        status: 'processing' as StatementStatus,
        file_url: null
      }
    }).then(stmt => ({
      ...stmt,
      format: stmt.format as StatementFormat,
      delivery: stmt.delivery as StatementDelivery,
      status: stmt.status as StatementStatus
    }));

    // TODO: Trigger async job to generate statement file
    // For now, we'll just simulate it by updating the status
    await prisma.statement.update({
      where: { id: statement.id },
      data: {
        status: 'completed' as StatementStatus,
        file_url: `https://storage.example.com/statements/${statement.id}.pdf`
      }
    });

    return res.status(201).json({ statement });
  } catch (error) {
    console.error('generateStatement error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to generate statement'
      }
    });
  }
};

export const getStatement = async (req: GetStatementRequest, res: Response<StatementResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { statementId } = req.params;

    const statement = await prisma.statement.findFirst({
      where: {
        id: statementId,
        user_id: userId
      },
      include: {
        account: {
          select: {
            account_number: true,
            account_type: true
          }
        }
      }
    }).then(stmt => stmt && {
      ...stmt,
      format: stmt.format as StatementFormat,
      delivery: stmt.delivery as StatementDelivery,
      status: stmt.status as StatementStatus
    });

    if (!statement) {
      return res.status(404).json({
        error: {
          code: 'STATEMENT_NOT_FOUND',
          message: 'Statement not found'
        }
      });
    }

    return res.json({ statement });
  } catch (error) {
    console.error('getStatement error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve statement details'
      }
    });
  }
};