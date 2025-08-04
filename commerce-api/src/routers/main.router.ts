import { Router } from 'express';
import transactionsRouter from './transactions.router';
const router = Router();

router.use('/api/transactions', transactionsRouter);

export default router;