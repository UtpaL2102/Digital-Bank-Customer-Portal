import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();
router.post("/api/v1/transfer", async (req, res, next) => {
  try {
    const headers = forwardContextHeaders(req);
    // forward idempotency header too
    if (req.headers["idempotency-key"]) headers["Idempotency-Key"] = req.headers["idempotency-key"] as string;
    const r = await accountClient.post("/transfer", req.body, { headers });
    return res.status(r.status).json(r.data);
  } catch (e:any) { if (e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});
export default router;
