import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AppError } from './utils/app.error';

const app: Express = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'success request',
  });
});

const port = 5000;

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
  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
