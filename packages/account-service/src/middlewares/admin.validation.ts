import { Request, Response, NextFunction } from 'express';

export const validateAccountLimits = (req: Request, res: Response, next: NextFunction) => {
  const { dailyLimit, monthlyLimit } = req.body;

  const errors: string[] = [];

  if (!dailyLimit || typeof dailyLimit !== 'number' || dailyLimit <= 0) {
    errors.push('Daily limit must be a positive number');
  }

  if (!monthlyLimit || typeof monthlyLimit !== 'number' || monthlyLimit <= 0) {
    errors.push('Monthly limit must be a positive number');
  }

  if (monthlyLimit && dailyLimit && dailyLimit > monthlyLimit) {
    errors.push('Daily limit cannot exceed monthly limit');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid account limits',
        details: errors
      }
    });
  }

  next();
};

export const validateEmployeeInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, role, branchId } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email address is required');
  }

  if (!role || typeof role !== 'string' || !['TELLER', 'MANAGER', 'ADMIN'].includes(role.toUpperCase())) {
    errors.push('Role must be one of: TELLER, MANAGER, ADMIN');
  }

  if (!branchId) {
    errors.push('Branch ID is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid employee data',
        details: errors
      }
    });
  }

  next();
};

export const validateBranchInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, address, city, state, country, pinCode } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  if (!address || typeof address !== 'string' || address.length < 5 || address.length > 200) {
    errors.push('Address must be between 5 and 200 characters');
  }

  if (!city || typeof city !== 'string' || city.length < 2 || city.length > 50) {
    errors.push('City must be between 2 and 50 characters');
  }

  if (!state || typeof state !== 'string' || state.length < 2 || state.length > 50) {
    errors.push('State must be between 2 and 50 characters');
  }

  if (!country || typeof country !== 'string' || country.length < 2 || country.length > 50) {
    errors.push('Country must be between 2 and 50 characters');
  }

  if (!pinCode || typeof pinCode !== 'string' || !/^\d{6}$/.test(pinCode)) {
    errors.push('Pin code must be a 6-digit number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid branch data',
        details: errors
      }
    });
  }

  next();
};