import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validateTransferInput } from '../middlewares/transfer.middleware.js';
import { 
  initiateTransfer,
  getScheduledTransfers,
  cancelScheduledTransfer
} from '../controllers/transfers.controller.js';

const router: Router = Router();

router.use(requireAuth);

// Transfer routes
router.post('/transfer', validateTransferInput as any, initiateTransfer as any);
router.get('/transfers/scheduled', getScheduledTransfers as any);
router.delete('/transfers/scheduled/:transferId', cancelScheduledTransfer as any);

export default router;