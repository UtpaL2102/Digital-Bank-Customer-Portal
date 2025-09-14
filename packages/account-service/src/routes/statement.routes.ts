// packages/account-service/src/routes/statement.routes.ts
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { listStatements, generateStatement, getStatement } from "../controllers/statements.controller";

const router = Router();

router.get("/", requireAuth, listStatements);
router.post("/", requireAuth, generateStatement);
router.get("/:statementId", requireAuth, getStatement);

export default router;
