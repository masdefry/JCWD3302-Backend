import { prisma } from '../../prisma/prisma.client';

export const expiryTransactionJob = async () => {
  const updatedTransaction = await prisma.transaction.updateMany({
    where: {
      status: 'WAITING_FOR_PAYMENT',
      expiryAt: {
        lte: new Date(),
      },
    },
    data: {
      status: 'EXPIRED',
    },
  });

  console.log(`[⌚ CRON] ${updatedTransaction.count} has been expiry 💸`)
};
