import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prismaClient.js';

export async function AdminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - User ID not provided' });
  }

  try {
    // Check if the user is an employee
    const employee = await prisma.employee.findFirst({
      where: {
        user_id: userId,
        position: 'ADMIN' // Or any other admin position criteria
      }
    });

    if (!employee) {
      return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }

    // Add employee info to request for later use
    (req as any).employee = employee;
    next();
  } catch (error) {
    console.error('Error in admin auth middleware:', error);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
}