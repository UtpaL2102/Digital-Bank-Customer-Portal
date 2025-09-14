// packages/account-service/src/routes/limits.routes.ts
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { getLimits, createLimitRequest, listMyLimitRequests } from "../controllers/limits.controller";

const router = Router();
router.use(requireAuth);

router.get("/", getLimits); // /api/v1/limits?accountId=...
router.post("/limit-requests", requireAuth, createLimitRequest);
router.get("/limit-requests", requireAuth, listMyLimitRequests);

export default router;
