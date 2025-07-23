import { Router } from 'express';
import {
  authLoginController,
  authRegisterController,
} from '../controllers/auth.controller';
import { jwtVerify, verifyRole } from '../middlewares/auth.middleware';
const authRouter = Router();

authRouter.post('/login', authLoginController);
authRouter.post('/register', jwtVerify, verifyRole(['HR', 'MANAGER']), authRegisterController);

export default authRouter;
