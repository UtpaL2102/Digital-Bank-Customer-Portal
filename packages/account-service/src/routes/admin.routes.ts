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