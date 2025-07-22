import express, { Express, Request, Response, NextFunction } from 'express';
import mainRouter from './routers/index.router';

const app: Express = express();
app.use(express.json());
const port = 3001;

app.use(mainRouter);

// Centralized Error
app.use((error: any, _: Request, res: Response, __: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error?.message,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
