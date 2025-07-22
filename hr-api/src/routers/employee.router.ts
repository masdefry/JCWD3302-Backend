import { Router } from 'express';
import { createEmployeeController } from '../controllers/employee.controller';
const employeeRouter = Router();

employeeRouter.post('/', createEmployeeController);

export default employeeRouter;
