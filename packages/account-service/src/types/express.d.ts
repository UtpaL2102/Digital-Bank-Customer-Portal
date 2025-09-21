import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        status: string;
      };
      employee?: {
        id: string;
        user_id: string;
        branch_id: string;
        position?: string;
      };
    }
  }
}