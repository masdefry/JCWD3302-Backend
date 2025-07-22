import { Router } from 'express';
import employeeRouter from './employee.router';
const mainRouter = Router();

mainRouter.use('/api/employee', employeeRouter);

export default mainRouter;