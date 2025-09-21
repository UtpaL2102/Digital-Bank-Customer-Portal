import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();
router.get("/api/v1/scheduled-transfers", async (req, res, next) => {
  try {
    const r = await accountClient.get("/scheduled-transfers", { headers: forwardContextHeaders(req), params: req.query });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

router.post("/api/v1/scheduled-transfers", async (req, res, next) => {
  try {
    const r = await accountClient.post("/scheduled-transfers", req.body, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

router.put("/api/v1/scheduled-transfers/:id", async (req, res, next) => {
  try {
    const r = await accountClient.put(`/scheduled-transfers/${encodeURIComponent(req.params.id)}`, req.body, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

router.post("/api/v1/scheduled-transfers/:id/pause", async (req, res, next) => {
  try { const r = await accountClient.post(`/scheduled-transfers/${encodeURIComponent(req.params.id)}/pause`, null, { headers: forwardContextHeaders(req) }); return res.status(r.status).json(r.data); }
  catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});
router.post("/api/v1/scheduled-transfers/:id/resume", async (req, res, next) => {
  try { const r = await accountClient.post(`/scheduled-transfers/${encodeURIComponent(req.params.id)}/resume`, null, { headers: forwardContextHeaders(req) }); return res.status(r.status).json(r.data); }
  catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});
router.delete("/api/v1/scheduled-transfers/:id", async (req, res, next) => {
  try {
    const r = await accountClient.delete(`/scheduled-transfers/${encodeURIComponent(req.params.id)}`, { 
      headers: forwardContextHeaders(req) 
    });
    return res.status(r.status).json(r.data);
  } catch (e:any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default router;
