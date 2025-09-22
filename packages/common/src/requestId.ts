import { Request as ExpressRequest, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

interface CustomRequest extends ExpressRequest {
  requestId?: string;
}
export function requestId(req: CustomRequest, res: Response, next: NextFunction) {
  req.requestId = (req.headers["x-request-id"] as string) || uuidv4();
  res.setHeader("x-request-id", req.requestId);
  next();
}
