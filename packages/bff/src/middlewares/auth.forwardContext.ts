import { Request } from "express";
export function forwardContextHeaders(req: Request) {
const u = (req as any).user || {};
 const headers: Record<string,string> = {
    "x-user-id": u.id || "",
    "x-user-role": u.role || "user",
    "x-user-status": u.status || ""
  };
  const auth = req.header("authorization") || req.header("Authorization");
  if (auth) headers["authorization"] = auth;
  return headers;
}