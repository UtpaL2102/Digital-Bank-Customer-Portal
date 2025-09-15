// packages/bff/src/routes/admin.bff.routes.ts
import { Router } from "express";
import axios from "axios";
import { forwardContextHeaders } from "../middlewares/auth.forwardContext.js"; // existing
const router = Router();

const accountClient = axios.create({ baseURL: process.env.ACCOUNT_SVC_BASE_URL || "http://localhost:4002/api/v1", timeout: 10000 });

router.get("/api/v1/admin/limit-requests", async (req, res, next) => {
  try {
    const r = await accountClient.get("/admin/limit-requests", { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (err: any) {
    if (err.response) return res.status(err.response.status).json(err.response.data);
    next(err);
  }
});

router.put("/api/v1/admin/limit-requests/:limitRequestId/approve", async (req, res, next) => {
  try {
    const r = await accountClient.put(`/admin/limit-requests/${encodeURIComponent(req.params.limitRequestId)}/approve`, req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (err: any) {
    if (err.response) return res.status(err.response.status).json(err.response.data);
    next(err);
  }
});

router.put("/api/v1/admin/limit-requests/:limitRequestId/decline", async (req, res, next) => {
  try {
    const r = await accountClient.put(`/admin/limit-requests/${encodeURIComponent(req.params.limitRequestId)}/decline`, req.body, { headers: forwardContextHeaders(req) });
    res.status(r.status).json(r.data);
  } catch (err: any) {
    if (err.response) return res.status(err.response.status).json(err.response.data);
    next(err);
  }
});

// Employees proxy
router.get("/api/v1/admin/employees", async (req, res, next) => {
  try { const r = await accountClient.get("/admin/employees", { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});
router.post("/api/v1/admin/employees", async (req, res, next) => {
  try { const r = await accountClient.post("/admin/employees", req.body, { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});
router.put("/api/v1/admin/employees/:employeeId", async (req, res, next) => {
  try { const r = await accountClient.put(`/admin/employees/${encodeURIComponent(req.params.employeeId)}`, req.body, { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});
router.delete("/api/v1/admin/employees/:employeeId", async (req, res, next) => {
  try { const r = await accountClient.delete(`/admin/employees/${encodeURIComponent(req.params.employeeId)}`, { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e); }
});

// Branches & audit logs proxies similar:
router.get("/api/v1/admin/branches", async (req, res, next) => { try { const r = await accountClient.get("/admin/branches", { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e);} });
router.post("/api/v1/admin/branches", async (req, res, next) => { try { const r = await accountClient.post("/admin/branches", req.body, { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e);} });
router.put("/api/v1/admin/branches/:branchId", async (req, res, next) => { try { const r = await accountClient.put(`/admin/branches/${encodeURIComponent(req.params.branchId)}`, req.body, { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e);} });
router.delete("/api/v1/admin/branches/:branchId", async (req, res, next) => { try { const r = await accountClient.delete(`/admin/branches/${encodeURIComponent(req.params.branchId)}`, { headers: forwardContextHeaders(req) }); res.status(r.status).json(r.data); } catch (e:any){ if(e.response) return res.status(e.response.status).json(e.response.data); next(e);} });

router.get("/api/v1/admin/audit-logs", async (req, res, next) => {
  try {
    const q = req.query;
    const r = await accountClient.get("/admin/audit-logs", { headers: forwardContextHeaders(req), params: q });
    res.status(r.status).json(r.data);
  } catch (e:any) {
    if (e.response) return res.status(e.response.status).json(e.response.data);
    next(e);
  }
});

export default router;
