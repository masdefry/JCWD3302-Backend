import cron from 'node-cron';
import { expiryTransactionJob } from './expiry.transaction.job';

export const expiryTransactionSchedule = () => {
  cron.schedule('* * * * *', async () => {
    console.log(`[⌚ CRON] Executed`);
    await expiryTransactionJob();
  });
};
