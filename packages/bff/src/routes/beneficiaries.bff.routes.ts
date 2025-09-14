// packages/bff/src/routes/beneficiaries.bff.routes.ts
import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();

// Note: we expose same paths to frontend and proxy to account-svc
router.get("/api/v1/beneficiaries", async (req, res, next) => {
  try {
    const r = await accountClient.get("/beneficiaries", { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

router.post("/api/v1/beneficiaries", async (req, res, next) => {
  try {
    const r = await accountClient.post("/beneficiaries", req.body, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

router.put("/api/v1/beneficiaries/:beneficiaryId", async (req, res, next) => {
  try {
    const { beneficiaryId } = req.params;
    const r = await accountClient.put(`/beneficiaries/${encodeURIComponent(beneficiaryId)}`, req.body, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

router.delete("/api/v1/beneficiaries/:beneficiaryId", async (req, res, next) => {
  try {
    const { beneficiaryId } = req.params;
    const r = await accountClient.delete(`/beneficiaries/${encodeURIComponent(beneficiaryId)}`, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default router;
