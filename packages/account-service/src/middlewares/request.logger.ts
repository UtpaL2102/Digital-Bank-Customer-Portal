import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  const startTime = Date.now();

  // Add requestId to request for tracking
  (req as any).requestId = requestId;

  // Log request
  console.log({
    requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log({
      requestId,
      timestamp: new Date().toISOString(),
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};