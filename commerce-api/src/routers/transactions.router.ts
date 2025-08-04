import { createTransactionController } from '../controllers/transactions.controller';
import { Router } from 'express';
const transactionsRouter = Router();

transactionsRouter.post('/', createTransactionController);

export default transactionsRouter;
