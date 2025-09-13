// src/routes/accounts.ts
import { Router } from "express";
import { listAccounts, getAccount } from "../controllers/accounts.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", requireAuth, listAccounts);
router.get("/:accountId", requireAuth, getAccount);

export default router;
