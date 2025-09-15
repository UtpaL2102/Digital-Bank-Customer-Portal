import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  code: string;
  status: number;
  details?: any;
  requestId?: string;

  constructor(code: string, message: string, status = 500, details?: any, requestId?: string) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
    this.requestId = requestId;
  }
}

// Extend Express.Request to include optional requestId
declare module 'express' {
  interface Request {
    requestId?: string;
  }
}

export function errorHandler(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
  const error = err instanceof AppError ? err : new AppError('INTERNAL_ERROR', err.message);
  const requestId = req.requestId || req.headers['x-request-id'];

  res.status(error.status).json({
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
      requestId,
    },
  });
}
