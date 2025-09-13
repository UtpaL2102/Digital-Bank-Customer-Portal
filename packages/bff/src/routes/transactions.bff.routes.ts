// packages/bff/src/routes/transactions.bff.routes.ts
import { Router } from "express";
import { accountClient } from "../clients/account.client.js"; // or your service client
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js"; // if you have one

const router = Router();

router.get("/api/v1/transactions", async (req, res, next) => {
  try {
        console.log("[bff:transactions] incoming GET", req.originalUrl, "query:", req.query);

    const r = await accountClient.get("/transactions", { headers: forwardContextHeaders(req) });
    console.log("[bff:transactions] proxied to account-svc /transactions - status:", r.status);
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

router.get("/api/v1/transactions/:transactionId", async (req, res, next) => {
  try {
    
    const { transactionId } = req.params;
    console.log("[bff:transactions] incoming GET", req.originalUrl, "params:", req.params);
    const r = await accountClient.get(`/transactions/${encodeURIComponent(transactionId)}`, { headers: forwardContextHeaders(req) });
    console.log("[bff:transactions] proxied to account-svc /transactions/:id - status:", r.status);
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default router;
