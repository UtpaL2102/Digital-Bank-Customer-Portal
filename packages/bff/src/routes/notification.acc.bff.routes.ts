import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();

router.get("/api/v1/notifications", async (req, res, next) => {
  try {
    const params = req.query;
    const r = await accountClient.get("/notifications", { headers: forwardContextHeaders(req), params });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

router.post("/api/v1/notifications/read-all", async (req, res, next) => {
  try {
    const r = await accountClient.post("/notifications/read-all", null, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

router.post("/api/v1/notifications/:id/read", async (req, res, next) => {
  try {
    const r = await accountClient.post(`/notifications/${encodeURIComponent(req.params.id)}/read`, null, { headers: forwardContextHeaders(req) });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

export default router;
