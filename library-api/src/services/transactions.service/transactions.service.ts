import { addDays, format } from 'date-fns';
import pool from '../../db/connection';

export const createTransactionsService = async ({
  membersid,
  staffsid,
  branchsid,
  booksids,
}: any) => {
  const now = format(new Date(), 'yyyy-MM-dd');
  // Check transactions on this date
  const findTransactionsByMembersIdAndBorrowDate = await pool.query(
    `SELECT * FROM transactions WHERE membersid = $1 AND borrowdate = $2`,
    [membersid, now]
  );

  if (findTransactionsByMembersIdAndBorrowDate.rows.length)
    throw new Error(`Member already lend a transaction today: ${now}`);

  if (booksids.length > 5)
    throw new Error('Member only can borrow maximum 5 books per-transaction');

  const createdTransaction = await pool.query(
    `INSERT INTO transactions(branchesid, membersid, staffsid, duedate) VALUES($1, $2, $3, $4) RETURNING id`,
    [branchsid, membersid, staffsid, addDays(now, 3)]
  );
  const createdTransactionInsertId = createdTransaction?.rows[0]?.id;

  booksids.forEach(async (book: any) => {
    await pool.query(`INSERT INTO transactiondetails(transactionsid, booksid) VALUES($1, $2)`, [createdTransactionInsertId, book])
  })
};
