import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.header('x-user-id');
  const userRole = req.header('x-user-role');
  const userStatus = req.header('x-user-status');

  if (!userId || !userRole) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    });
  }

  // Only allow verified users
  if (userStatus !== 'verified') {
    return res.status(403).json({
      error: {
        code: 'KYC_REQUIRED',
        message: 'KYC verification required'
      }
    });
  }

  // Attach user context to request
  (req as any).user = {
    id: userId,
    role: userRole,
    status: userStatus
  };

  next();
}