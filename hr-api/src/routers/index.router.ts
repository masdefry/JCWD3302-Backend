import { Router } from 'express';
import authRouter from './auth.router';
import timeOffRouter from './timeoff.router';
const mainRouter = Router();

mainRouter.use('/api/auth', authRouter);
mainRouter.use('/api/time-off', timeOffRouter);

export default mainRouter;
