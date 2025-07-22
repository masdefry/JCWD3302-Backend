import { Router } from "express";
import { authLoginController } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post('/login', authLoginController);

export default authRouter;