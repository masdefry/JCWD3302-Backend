import Queue from 'bull';
import { prisma } from '../../prisma/prisma.client';

export const expiryTransactionsQueue = new Queue('expiry-transactions', {
  redis: { port: Number(process.env.REDIS_PORT), host: process.env.REDIS_HOST },
});

expiryTransactionsQueue.process(async (job) => {
  const { transactionId } = job?.data;

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (transaction && transaction?.status === 'WAITING_FOR_PAYMENT') {
    await prisma.transaction.update({
      data: {
        status: 'EXPIRED',
      },
      where: {
        id: transactionId,
      },
    });

    console.log(`[⌚ QUEUE] Transaction ${transactionId} has been expired 💸`);
  }
});
