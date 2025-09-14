// packages/account-service/src/routes/beneficiaries.routes.ts
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { listBeneficiaries, createBeneficiary, updateBeneficiary, deleteBeneficiary } from "../controllers/beneficiaries.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listBeneficiaries);
router.post("/", createBeneficiary);
router.put("/:beneficiaryId", updateBeneficiary);
router.delete("/:beneficiaryId", deleteBeneficiary);

export default router;