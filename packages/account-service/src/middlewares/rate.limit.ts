import rateLimit from 'express-rate-limit';

// General API rate limit
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
});

// More strict limit for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later'
    }
  }
});

// Transfer endpoint rate limit
export const transferLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 transfer requests per hour
  message: {
    error: {
      code: 'TRANSFER_RATE_LIMIT_EXCEEDED',
      message: 'Too many transfer attempts, please try again later'
    }
  }
});

// Admin endpoint rate limit
export const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 admin requests per hour
  message: {
    error: {
      code: 'ADMIN_RATE_LIMIT_EXCEEDED',
      message: 'Too many admin requests, please try again later'
    }
  }
});