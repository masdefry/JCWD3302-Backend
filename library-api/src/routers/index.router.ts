import { Router } from 'express';
import membersRouter from './members.router';
import transactionsRouter from './transactions.router';
const mainRouter = Router();

mainRouter.use('/api/members', membersRouter);
mainRouter.use('/api/transactions', transactionsRouter);

export default mainRouter;
