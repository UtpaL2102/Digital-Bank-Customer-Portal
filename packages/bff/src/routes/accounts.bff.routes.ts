import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

export const accountsBffRouter = Router();

accountsBffRouter.get("/api/v1/accounts", async (req, res, next) => {
  try {
    // console.log('[BFF] forwarding request to account-service', { path: '/accounts', user: (req as any).user?.id });
    const r = await accountClient.get("/accounts", { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (e: any) { if (e.response) res.status(e.response.status).json(e.response.data); else next(e); }
});

accountsBffRouter.get("/api/v1/accounts/search", async (req, res, next) => {
  try {
    console.log('[BFF] forwarding search request', { query: req.query });
    const r = await accountClient.get("/accounts/search", { 
      headers: forwardContextHeaders(req),
      params: req.query // Forward the search term
    });
    res.status(r.status).json(r.data);
  } catch (e: any) { 
    if (e.response) res.status(e.response.status).json(e.response.data); 
    else next(e); 
  }
});

accountsBffRouter.get("/api/v1/accounts/summary", async (req, res, next) => {
  try {
    const r = await accountClient.get("/accounts/summary", { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

accountsBffRouter.get("/api/v1/accounts/:accountId", async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const r = await accountClient.get(`/accounts/${encodeURIComponent(accountId)}`, {
      headers: forwardContextHeaders(req)
    });
    // pass through status and body from account-service
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default accountsBffRouter;

// ...repeat forwardContextHeaders for all routes in this file, including /transactions, /transfer, /beneficiaries, /limits, etc.