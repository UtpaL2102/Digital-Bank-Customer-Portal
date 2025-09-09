import { Router } from "express";
import * as http from 'http';
import { createProxyMiddleware } from "http-proxy-middleware";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();
const target = process.env.AUTH_SERVICE_URL || "http://localhost:4001";

// Proxy helper that also forwards user headers
const kycProxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: { '^/api/v1': '' },   // ensure auth-service sees /kyc/...
  onProxyReq: ((proxyReq:http.ClientRequest, req: any) => {
    const ctx = forwardContextHeaders(req);
    Object.entries(ctx).forEach(([k, v]) =>
      proxyReq.setHeader(k, v as string)
    );
  }),
} as Parameters<typeof createProxyMiddleware>[0]);

// User KYC
router.post("/api/v1/kyc/documents", kycProxy); // multipart passthrough

router.post("/api/v1/kyc/submit", async (req, res, next) => {
  try {
    const r = await (
      await fetch(`${target}/kyc/submit`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(forwardContextHeaders(req) as any),
        },
        body: JSON.stringify(req.body),
      })
    ).json();
    res.json(r);
  } catch (e) {
    next(e);
  }
});

router.get("/api/v1/kyc/status", async (req, res, next) => {
  try {
    const r = await (
      await fetch(`${target}/kyc/status`, {
        headers: { ...(forwardContextHeaders(req) as any) },
      })
    ).json();
    res.json(r);
  } catch (e) {
    next(e);
  }
});

// Admin
// Keep admin GETs proxied (safe)
router.get("/api/v1/admin/kyc/pending", kycProxy);
router.get("/api/v1/admin/kyc/:userId", kycProxy);

// Admin approve/reject POSTs with JSON-forwarding handlers

router.post("/api/v1/admin/kyc/:userId/approve", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const targetUrl = `${target}/admin/kyc/${userId}/approve`;
    const r = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(forwardContextHeaders(req) as any)
      },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return next(e);
  }
});

router.post("/api/v1/admin/kyc/:userId/reject", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const targetUrl = `${target}/admin/kyc/${userId}/reject`;
    const r = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(forwardContextHeaders(req) as any)
      },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return next(e);
  }
});

//notification routes for kyc related notification
router.get("/api/v1/notifications", kycProxy);
router.post("/api/v1/notifications/:id/read", kycProxy);

export default router;
