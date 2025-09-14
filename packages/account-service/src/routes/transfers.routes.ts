import { Router } from "express";
import { createTransfer } from "../controllers/transfers.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.post("/api/v1/transfer", requireAuth, createTransfer);

export default router;
