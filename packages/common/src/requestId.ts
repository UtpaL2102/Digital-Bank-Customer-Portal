import { v4 as uuidv4 } from 'uuid';

import type { Request, Response, NextFunction } from 'express';

export function requestId(req: Request, res: Response, next: NextFunction) {
  const headerValue = req.headers['x-request-id'];
  req.requestId = (Array.isArray(headerValue) ? headerValue[0] : headerValue) || uuidv4();
  res.setHeader('x-request-id', req.requestId);
  next();
}
