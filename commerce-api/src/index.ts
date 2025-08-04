import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AppError } from './utils/app.error';
import { logger } from './utils/logger';
import router from './routers/main.router';
import { expiryTransactionSchedule } from './jobs/cron/expiry.transaction.schedule';

const app: Express = express();
const port = 5000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

expiryTransactionSchedule();
app.use(router);

app.use((error: any, req: Request, res: Response, __: NextFunction) => {
  const statusCode =
    error.statusCode ||
    (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'
      ? 401
      : 500);
  const message =
    error instanceof AppError || error.isOperational
      ? error.message ||
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      : 'Internal Server Error';

  logger.error(`[${req?.method}]${req?.url} - ${message}`, {
    statusCode,
    name: error.name,
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });

  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
