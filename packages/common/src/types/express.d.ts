import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    // request id used across services
    requestId?: string;
    // authenticated user object (minimal)
    user?: {
      id?: string;
      [key: string]: any;
    };
  }
}
