import { Router } from 'express';
const authRouter = Router();
import { authLogin, authRegister } from '../controllers/auth.controller';

authRouter.post('/', authLogin);
authRouter.post('/register', authRegister);

export default authRouter;
