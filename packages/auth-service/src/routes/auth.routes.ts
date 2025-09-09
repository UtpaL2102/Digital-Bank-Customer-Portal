import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schemas";
import * as ctrl from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/auth/register", validate(RegisterSchema), ctrl.register);

authRouter.post("/auth/login", validate(LoginSchema), ctrl.login);

// authRouter.post("/auth/register-admin", ctrl.registerAdmin);

export default authRouter;