// packages/bff/src/routes/limits.bff.routes.ts
import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();

router.get("/api/v1/limits", async (req, res, next) => {
  try {
    const r = await accountClient.get("/limits", { params: req.query, headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// create limit request
router.post("/api/v1/limit-requests", async (req, res, next) => {
  try {
    const r = await accountClient.post("/limits/limit-requests", req.body, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// list my limit requests
router.get("/api/v1/limit-requests", async (req, res, next) => {
  try {
    const r = await accountClient.get("/limits/limit-requests", { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default router;
