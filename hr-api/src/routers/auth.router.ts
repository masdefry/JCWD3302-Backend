import { Router } from 'express';
import {
  authLoginController,
  authRegisterController,
  authSessionLoginController,
  updatePasswordController,
} from '../controllers/auth.controller';
import { jwtVerify, verifyRole } from '../middlewares/auth.middleware';
const authRouter = Router();

authRouter.post('/login', authLoginController);
authRouter.post(
  '/register',
  jwtVerify,
  verifyRole(['HR', 'MANAGER']),
  authRegisterController
);
authRouter.get('/session-login', jwtVerify, authSessionLoginController);
authRouter.patch('/reset-password', jwtVerify, updatePasswordController);

export default authRouter;
