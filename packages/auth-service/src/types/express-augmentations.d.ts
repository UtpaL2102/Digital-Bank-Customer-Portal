// packages/auth-service/src/types/express-augmentations.d.ts
// Make this an *ambient* augmentation using `declare global` and then export nothing.
import 'express'; // side-effect import to ensure types are loaded (keeps file a module but OK)

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: {
        id?: string;
        [key: string]: any;
      };
    }
  }
}

// make the file a module (so TS treats it consistently)
export {};
