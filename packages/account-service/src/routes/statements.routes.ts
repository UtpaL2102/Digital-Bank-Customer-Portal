import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { listStatements, generateStatement, getStatement } from '../controllers/statements.controller.js';
import { ListStatementsRequest, GenerateStatementRequest, GetStatementRequest } from '../types/statements.js';

const router: Router = Router();

router.use(requireAuth);

// Statement routes
router.get('/statements', listStatements as any);
router.post('/statements', generateStatement as any);
router.get('/statements/:statementId', getStatement as any);

export default router;