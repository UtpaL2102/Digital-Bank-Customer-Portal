// packages/account-service/src/routes/loans.routes.ts
import { Router } from "express";
import { listLoans, getLoan, getLoanSchedule } from "../controllers/loans.controller";
import { requireAuth } from "../middlewares/auth.middleware"; // keep same middleware path

const router = Router();

router.get("/", requireAuth, listLoans);
router.get("/:loanId", requireAuth, getLoan);
router.get("/:loanId/schedule", requireAuth, getLoanSchedule);

export default router;
