import { Router } from "express";
import {
  listScheduled, createScheduled, updateScheduled,
  pauseScheduled, resumeScheduled, cancelScheduled
} from "../controllers/scheduledTransfers.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/api/v1/scheduled-transfers", requireAuth, listScheduled);
router.post("/api/v1/scheduled-transfers", requireAuth, createScheduled);
router.put("/api/v1/scheduled-transfers/:id", requireAuth, updateScheduled);
router.post("/api/v1/scheduled-transfers/:id/resume", requireAuth, resumeScheduled);
router.post("/api/v1/scheduled-transfers/:id/pause", requireAuth, pauseScheduled);
router.delete("/api/v1/scheduled-transfers/:id", requireAuth, cancelScheduled);

export default router;
