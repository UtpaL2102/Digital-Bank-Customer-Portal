import { Request, Response, NextFunction } from 'express';

export const validateBeneficiaryInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, account_number, bank_name, ifsc_swift } = req.body;

  const errors: string[] = [];

  if (name && (typeof name !== 'string' || name.length < 2 || name.length > 100)) {
    errors.push('Name must be between 2 and 100 characters');
  }

  if (account_number && (typeof account_number !== 'string' || account_number.length < 8 || account_number.length > 20)) {
    errors.push('Account number must be between 8 and 20 characters');
  }

  if (bank_name && (typeof bank_name !== 'string' || bank_name.length < 2 || bank_name.length > 100)) {
    errors.push('Bank name must be between 2 and 100 characters');
  }

  if (ifsc_swift && (typeof ifsc_swift !== 'string' || !/^[A-Z0-9]{8,11}$/.test(ifsc_swift))) {
    errors.push('IFSC/SWIFT code must be 8-11 alphanumeric characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid beneficiary data',
        details: errors
      }
    });
  }

  next();
};