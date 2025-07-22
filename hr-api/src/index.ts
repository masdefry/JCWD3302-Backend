import express, { Express, Request, Response, NextFunction } from 'express';
import mainRouter from './routers/index.router';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = 3001;

app.use(mainRouter);

// Centralized Error
app.use((error: any, _: Request, res: Response, __: NextFunction) => {
  res.status(error?.isExpose ? error?.statusCode : 500).json({
    success: false,
    message: error?.isExpose ? error?.message : 'Something went wrong',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
