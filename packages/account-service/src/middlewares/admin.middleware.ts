import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prismaClient.js';

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;

    const employee = await prisma.employee.findFirst({
      where: { 
        user_id: userId,
        position: 'ADMIN'
      }
    });

    if (!employee) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Admin access required'
        }
      });
    }

    next();
  } catch (error) {
    console.error('requireAdmin error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to verify admin access'
      }
    });
  }
};