import { Router } from "express";
import { authClient } from "../clients/auth.client";

export const authBffRouter = Router();

authBffRouter.post("/api/v1/auth/register", async (req, res, next) => {
try {
const r = await authClient.post("/auth/register", req.body);
res.status(r.status).json(r.data);
} catch (e: any) {
if (e.response) return res.status(e.response.status).json(e.response.data);
next(e);
}
});

authBffRouter.post("/api/v1/auth/login", async (req, res, next) => {
try {
const r = await authClient.post("/auth/login", req.body);
res.status(r.status).json(r.data);
} catch (e: any) {
if (e.response) return res.status(e.response.status).json(e.response.data);
next(e);
}
});

export default authBffRouter;