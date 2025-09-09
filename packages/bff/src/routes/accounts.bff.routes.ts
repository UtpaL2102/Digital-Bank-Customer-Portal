import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

export const accountsBffRouter = Router();

accountsBffRouter.get("/api/v1/accounts", async (req, res, next) => {
try {
const r = await accountClient.get("/accounts", { headers: forwardContextHeaders(req) });
res.status(r.status).json(r.data);
} catch (e: any) { if (e.response) res.status(e.response.status).json(e.response.data); else next(e); }
});

export default accountsBffRouter;

// ...repeat forwardContextHeaders for all routes in this file, including /transactions, /transfer, /beneficiaries, /limits, etc.