import { Router } from 'express';
import { findRoutes } from '../controllers/routes.controller';
const routesRouter = Router();

routesRouter.get('/', findRoutes);

export default routesRouter;
