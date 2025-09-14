// packages/bff/src/routes/loans.bff.routes.ts
import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();


router.get("/api/v1/loans", async (req, res, next) => {
  try {
    const r = await accountClient.get("/loans", { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});


router.get("/api/v1/loans/:loanId", async (req, res, next) => {
  try {
    const r = await accountClient.get(`/loans/${encodeURIComponent(req.params.loanId)}`, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});


router.get("/api/v1/loans/:loanId/schedule", async (req, res, next) => {
  try {
    const r = await accountClient.get(`/loans/${encodeURIComponent(req.params.loanId)}/schedule`, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default router;
