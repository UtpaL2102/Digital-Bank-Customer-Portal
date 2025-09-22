import { Request, Response, NextFunction } from 'express';

export const validateTransferInput = (req: Request, res: Response, next: NextFunction) => {
  const { beneficiaryId, amount, description } = req.body;

  const errors: string[] = [];

  if (!beneficiaryId) {
    errors.push('Beneficiary ID is required');
  }

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    errors.push('Amount must be a positive number');
  }

  if (description && (typeof description !== 'string' || description.length > 200)) {
    errors.push('Description must be a string with maximum 200 characters');
  }

  if (req.body.scheduledDate) {
    const scheduledDate = new Date(req.body.scheduledDate);
    const now = new Date();
    
    if (isNaN(scheduledDate.getTime())) {
      errors.push('Invalid scheduled date format');
    } else if (scheduledDate < now) {
      errors.push('Scheduled date must be in the future');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid transfer data',
        details: errors
      }
    });
  }

  next();
};