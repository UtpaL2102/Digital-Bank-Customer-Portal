import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/authz";
import { uploadKyc } from "../middlewares/kycUpload.middleware";
import * as ctrl from "../controllers/kyc.controller";

export const kycRouter = Router();

kycRouter.use(requireAuth);

// User endpoints (available pre-verified)
kycRouter.post("/kyc/documents", uploadKyc.single("file"), ctrl.uploadDocument);
kycRouter.post("/kyc/submit", ctrl.submit);
kycRouter.get("/kyc/status", ctrl.status);

// Admin/reviewer
kycRouter.get("/admin/kyc/pending", requireRole("admin","kyc_reviewer"), ctrl.listPending);
kycRouter.get("/admin/kyc/:userId", requireRole("admin","kyc_reviewer"), ctrl.getCase);
kycRouter.post("/admin/kyc/:userId/approve", requireRole("admin","kyc_reviewer"), ctrl.approve);
kycRouter.post("/admin/kyc/:userId/reject", requireRole("admin","kyc_reviewer"), ctrl.reject);

export default kycRouter;

