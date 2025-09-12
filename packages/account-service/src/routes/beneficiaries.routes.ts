import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validateBeneficiaryInput } from '../middlewares/beneficiary.middleware.js';
import { 
  listBeneficiaries,
  addBeneficiary,
  updateBeneficiary,
  deleteBeneficiary
} from '../controllers/beneficiaries.controller.js';

const router: Router = Router();

router.use(requireAuth);

// Beneficiary routes
router.get('/beneficiaries', listBeneficiaries as any);
router.post('/beneficiaries', validateBeneficiaryInput as any, addBeneficiary as any);
router.put('/beneficiaries/:beneficiaryId', validateBeneficiaryInput as any, updateBeneficiary as any);
router.delete('/beneficiaries/:beneficiaryId', deleteBeneficiary as any);

export default router;