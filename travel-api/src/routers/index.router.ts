import { Router } from 'express';
import authRouter from './auth.router';
import routesRouter from './routes.router';

const mainRouter = Router();

mainRouter.use('/api/auth', authRouter);
mainRouter.use('/api/routes', routesRouter);

export default mainRouter;
