import { Router } from 'express';
import membersRouter from './members.router';
const mainRouter = Router();

mainRouter.use('/api/members', membersRouter);

export default mainRouter;