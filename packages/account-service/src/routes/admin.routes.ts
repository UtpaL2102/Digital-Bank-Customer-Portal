// packages/account-service/src/routes/admin.routes.ts
import { Router } from "express";
import * as adminCtrl from "../controllers/admin.controller.js";
import * as auditCtrl from "../controllers/audit.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import requireAdmin from "../middlewares/admin.auth.middleware.js";

const router = Router();

// The router is intended to be mounted at /api/v1/admin in app.ts,
// so define routes **relative** to that base path.

router.use(requireAuth);        // ensure user is set
router.use(requireAdmin);       // ensure admin role

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
router.post("/audit-events", auditCtrl.createAuditEvent); // Internal endpoint for services

export default router;
=======
import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';
import {
  validateAccountLimits,
  validateEmployeeInput,
  validateBranchInput
} from '../middlewares/admin.validation';
import {
  updateAccountLimits,
  listEmployees,
  addEmployee,
  updateEmployee,
  listBranches,
  addBranch,
  updateBranch
} from '../controllers/admin.controller';

const router = Router();

// Apply auth and admin middleware to all routes
router.use(requireAuth);
router.use(requireAdmin);

// Account management
router.put('/admin/accounts/:accountId/limits', validateAccountLimits, updateAccountLimits);

// Employee management
router.get('/admin/employees', listEmployees);
router.post('/admin/employees', validateEmployeeInput, addEmployee);
router.put('/admin/employees/:employeeId', validateEmployeeInput, updateEmployee);

// Branch management
router.get('/admin/branches', listBranches);
router.post('/admin/branches', validateBranchInput, addBranch);
router.put('/admin/branches/:branchId', validateBranchInput, updateBranch);

export default router;
