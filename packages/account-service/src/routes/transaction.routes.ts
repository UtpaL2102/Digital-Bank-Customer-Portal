// src/routes/transactions.ts
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { listTransactions, getTransaction } from "../controllers/transactions.controller";

const router = Router();

router.get("/", requireAuth, listTransactions);
router.get("/:transactionId", requireAuth, getTransaction);

export default router;
