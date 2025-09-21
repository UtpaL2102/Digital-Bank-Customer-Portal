// src/routes/accounts.ts
import { Router } from "express";
import { listAccounts, getAccount, accountSummary } from "../controllers/accounts.controller";
import { searchAccounts } from "../controllers/search.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", requireAuth, listAccounts);
router.get("/summary", requireAuth, accountSummary);
router.get("/search", requireAuth, searchAccounts);
router.get("/:accountId", requireAuth, getAccount);

export default router;
