import { NextFunction, Request, Response } from 'express';
import { createTransactionsService } from '../services/transactions.service/transactions.service';

export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // membersid: '', staffsid: '', branchsid: '', booksids: ['', '', '']
    const { membersid, staffsid, branchsid, booksids } = req.body;

    await createTransactionsService({ membersid, staffsid, branchsid, booksids })
  } catch (error) {
    next(error);
  }
};
