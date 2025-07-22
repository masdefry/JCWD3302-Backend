import { Router } from 'express';
import employeeRouter from './employee.router';
import authRouter from './auth.router';
const mainRouter = Router();

mainRouter.use('/api/employee', employeeRouter);
mainRouter.use('/api/auth', authRouter);

export default mainRouter;