import { Response } from 'express';

export interface ApiError {
  code: string;
  message: string;
  details?: string[];
}

export const sendError = (res: Response, status: number, error: ApiError) => {
  return res.status(status).json({ error });
};

export const handleServerError = (res: Response, error: any, context: string) => {
  console.error(`${context} error:`, error);
  return sendError(res, 500, {
    code: 'INTERNAL_ERROR',
    message: `Failed to ${context.toLowerCase()}`
  });
};

export const handleValidationError = (res: Response, errors: string[]) => {
  return sendError(res, 400, {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    details: errors
  });
};

export const handleNotFoundError = (res: Response, resource: string) => {
  return sendError(res, 404, {
    code: 'NOT_FOUND',
    message: `${resource} not found`
  });
};

export const handleUnauthorizedError = (res: Response) => {
  return sendError(res, 401, {
    code: 'UNAUTHORIZED',
    message: 'Authentication required'
  });
};

export const handleForbiddenError = (res: Response) => {
  return sendError(res, 403, {
    code: 'FORBIDDEN',
    message: 'Access denied'
  });
};

export const handleDuplicateError = (res: Response, resource: string) => {
  return sendError(res, 409, {
    code: 'DUPLICATE',
    message: `${resource} already exists`
  });
};

export const handleInsufficientFundsError = (res: Response) => {
  return sendError(res, 400, {
    code: 'INSUFFICIENT_FUNDS',
    message: 'Insufficient funds for this transaction'
  });
};