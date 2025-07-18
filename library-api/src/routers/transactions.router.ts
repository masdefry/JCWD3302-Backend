import { Router } from 'express';
import { createTransactionController } from '../controllers/transactions.controller';
const transactionsRouter = Router();

transactionsRouter.post('/', createTransactionController);

export default transactionsRouter;