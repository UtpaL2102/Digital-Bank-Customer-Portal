export class AppError extends Error {
  code: string;
  details?: any;
  requestId?: string;
  constructor(code: string, message: string, details?: any, requestId?: string) {
    super(message);
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

export function errorHandler(err, req, res, next) {
  const requestId = req.requestId || req.headers['x-request-id'];
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message,
      details: err.details,
      requestId,
    },
  });
}
