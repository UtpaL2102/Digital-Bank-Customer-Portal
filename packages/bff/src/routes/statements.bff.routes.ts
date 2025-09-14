// packages/bff/src/routes/statements.bff.routes.ts
import { Router } from "express";
import { accountClient } from "../clients/account.client.js";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js";

const router = Router();

// List statements (forward query)
router.get("/api/v1/statements", async (req, res, next) => {
  try {
    console.log("[bff:statements] incoming GET", req.originalUrl, "query:", req.query);
    const r = await accountClient.get("/statements", {
      headers: forwardContextHeaders(req),
      params: req.query,
    });
    console.log("[bff:statements] proxied list status:", r.status);
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    console.error("[bff:statements] list proxy error:", e?.message || e);
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// Create / generate statement
router.post("/api/v1/statements", async (req, res, next) => {
  try {
    console.log("[bff:statements] incoming POST /api/v1/statements body:", req.body);
    const r = await accountClient.post("/statements", req.body, {
      headers: forwardContextHeaders(req),
    });
    console.log("[bff:statements] proxied create status:", r.status);
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    console.error("[bff:statements] create proxy error:", e?.message || e);
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// Get statement detail
router.get("/api/v1/statements/:statementId", async (req, res, next) => {
  try {
    console.log("[bff:statements] incoming GET statement id:", req.params.statementId);
    const r = await accountClient.get(`/statements/${encodeURIComponent(req.params.statementId)}`, {
      headers: forwardContextHeaders(req),
    });
    console.log("[bff:statements] proxied detail status:", r.status);
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    console.error("[bff:statements] detail proxy error:", e?.message || e);
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

// in BFF routes
router.post("/api/v1/statements/:id/download-token", async (req, res, next) => {
  try {
    const r = await accountClient.post(
      `/statements/${encodeURIComponent(req.params.id)}/download-token`,
      null,
      { headers: forwardContextHeaders(req) }
    );
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

router.get("/api/v1/statements/:id/signed-url", async (req, res, next) => {
  try {
    const r = await accountClient.get(`/statements/${encodeURIComponent(req.params.id)}/signed-url`, {
      headers: forwardContextHeaders(req),
      params: { token: req.query.token },
    });
    return res.status(r.status).json(r.data);
  } catch (e:any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

/**
 * GET /api/v1/statements/:id/download
 * Proxy-stream the upstream PDF (pass token via query). Important: responseType: "stream"
 */
router.get("/api/v1/statements/:id/download", async (req, res, next) => {
  try {
    const r = await accountClient.get(
      `/statements/${encodeURIComponent(req.params.id)}/download`,
      {
        headers: forwardContextHeaders(req),
        params: { token: req.query.token },
        responseType: "stream",
      }
    );

    // copy important headers so clients see correct Content-Type/Disposition
    if (r.headers["content-type"]) res.setHeader("Content-Type", r.headers["content-type"]);
    if (r.headers["content-disposition"]) res.setHeader("Content-Disposition", r.headers["content-disposition"]);

    res.status(r.status);
    (r.data as NodeJS.ReadableStream).pipe(res);
  } catch (e: any) {
    if (e.response) {
      try { return res.status(e.response.status).json(e.response.data); }
      catch { return res.status(e.response.status).send(String(e.response.data || "upstream error")); }
    }
    next(e);
  }
});


export default router;
// Note: could also do router.use('/api/v1/statements', statementsRouter) if we imported the account-service router directly
// but this way we can log and customize per-route if needed
// Also, we must remember to forwardContextHeaders() on each request