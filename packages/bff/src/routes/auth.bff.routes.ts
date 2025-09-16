import { Router } from "express";
import { authClient } from "../clients/auth.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

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

authBffRouter.get("/api/v1/me", async (req, res, next) => {
  try {
    const r = await authClient.get("/me", { headers: { ...(forwardContextHeaders(req) as any) }});
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    return next(e);
  }
});

// Admin endpoints proxied via BFF
authBffRouter.post("/api/v1/admin/register", async (req, res, next) => {
  try {
    const r = await authClient.post("/admin/register", req.body);
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

authBffRouter.post("/api/v1/admin/login", async (req, res, next) => {
  try {
    const r = await authClient.post("/admin/login", req.body);
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// MFA routes
authBffRouter.post("/api/v1/auth/2fa/enable", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/2fa/enable", req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

authBffRouter.post("/api/v1/auth/2fa/verify", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/2fa/verify", req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

authBffRouter.post("/api/v1/auth/2fa/disable", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/2fa/disable", req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// login-verify (client sends temp_login_token + code)
authBffRouter.post("/api/v1/auth/2fa/login-verify", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/2fa/login-verify", req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// change-password (forward Authorization header)
authBffRouter.post("/api/v1/auth/change-password", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/change-password", req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// password-reset request
authBffRouter.post("/api/v1/auth/password-reset/request", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/password-reset/request", req.body);
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// password-reset verify
authBffRouter.post("/api/v1/auth/password-reset/verify", async (req, res, next) => {
  try {
    const r = await authClient.post("/auth/password-reset/verify", req.body);
    res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});


export default authBffRouter;