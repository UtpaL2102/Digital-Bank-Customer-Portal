// packages/account-service/src/routes/admin.routes.ts
import { Router } from "express";
import * as adminCtrl from "../controllers/admin.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import requireAdmin from "../middlewares/admin.auth.middleware.js";

const router = Router();

// The router is intended to be mounted at /api/v1/admin in app.ts,
// so define routes **relative** to that base path.

router.use(requireAuth);        // ensure user is set
// router.use(requireAdmin);       // ensure admin role

// Limit requests
router.get("/limit-requests", adminCtrl.listLimitRequests);
router.put("/limit-requests/:limitRequestId/approve", adminCtrl.approveLimitRequest);
router.put("/limit-requests/:limitRequestId/decline", adminCtrl.declineLimitRequest);

// Employees
router.get("/employees", adminCtrl.listEmployees);
router.post("/employees", adminCtrl.createEmployee);
router.put("/employees/:employeeId", adminCtrl.updateEmployee);
router.delete("/employees/:employeeId", adminCtrl.deleteEmployee);

// Branches
router.get("/branches", adminCtrl.listBranches);
router.post("/branches", adminCtrl.createBranch);
router.put("/branches/:branchId", adminCtrl.updateBranch);
router.delete("/branches/:branchId", adminCtrl.deleteBranch);

// Audit logs
router.get("/audit-logs", adminCtrl.listAuditLogs);

export default router;
