import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma.client';
import { AppError } from '../utils/app.error';
import { addMinutes } from 'date-fns';
import { expiryTransactionsQueue } from '../jobs/queue/expiry.transaction.queue';

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  const { productId, quantity } = req.body;

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) throw AppError(`Product with id = ${productId} not found`, 404);

  const createdTransaction = await prisma.transaction.create({
    data: {
      productId,
      quantity,
      totalPrice: quantity * Number(product?.price),
      expiryAt: addMinutes(new Date(), 1),
    },
  });

  await expiryTransactionsQueue.add(
    `expiry-transaction-queue-for-id-${createdTransaction?.id}`,
    { transactionId: createdTransaction?.id },
    { delay: 1 * 60 * 1000 }
  );

  res.status(201).json({
    success: true,
    message: `Transaction created successfully`,
    data: {
      transactionNumber: createdTransaction?.id,
      status: 'WAITING_FOR_PAYMENT',
      totalPrice: quantity * Number(product?.price),
    },
  });
};
