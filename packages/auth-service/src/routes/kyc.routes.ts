import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/authz";
import { uploadKyc } from "../middlewares/kycUpload.middleware";
import * as ctrl from "../controllers/kyc.controller";

export const kycRouter = Router();

kycRouter.use(requireAuth);

// User endpoints (available pre-verified)
// kycRouter.post("/kyc/documents", uploadKyc.single("file"), ctrl.uploadDocument);
kycRouter.post("/kyc/documents", (req, res, next) => {
  uploadKyc.single("file")(req, res, (err?: any) => {
    if (err) {
      // Normalize mul-ter and file errors to JSON
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: { code: "FILE_TOO_LARGE", message: `File is too large (max ${process.env.MAX_UPLOAD_BYTES || 10485760} bytes)` } });
      }
      if (err.message === "INVALID_DOC_KIND") {
        return res.status(400).json({ error: { code: "INVALID_DOC_KIND", message: "Invalid doc_kind" } });
      }
      if (err.message === "UNSUPPORTED_FILE_TYPE") {
        return res.status(400).json({ error: { code: "UNSUPPORTED_FILE_TYPE", message: "Unsupported file type" } });
      }
      // fallback
      return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
    }
    // No multer error -> call controller
    next();
  });
}, ctrl.uploadDocument);
kycRouter.post("/kyc/submit", ctrl.submit);
kycRouter.get("/kyc/status", ctrl.status);

// Admin/reviewer
kycRouter.get("/admin/kyc", requireRole("admin","kyc_reviewer"), ctrl.listAll);
kycRouter.get("/admin/kyc/pending", requireRole("admin","kyc_reviewer"), ctrl.listPending);
kycRouter.get("/admin/kyc/:userId", requireRole("admin","kyc_reviewer"), ctrl.getCase);
kycRouter.post("/admin/kyc/:userId/approve", requireRole("admin","kyc_reviewer"), ctrl.approve);
kycRouter.post("/admin/kyc/:userId/reject", requireRole("admin","kyc_reviewer"), ctrl.reject);

export default kycRouter;

