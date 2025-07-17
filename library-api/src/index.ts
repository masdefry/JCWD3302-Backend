import express, { Express, Request, Response, NextFunction } from 'express';
import pool from './db/connection';
import mainRouter from './routers/index.router';

const app: Express = express();
app.use(express.json());
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

pool.connect((err, client, release) => {
  if (err) return console.log(`Error acquiring client ${err.stack}`);

  console.log('🔌[database]: Connection successful at postgresql database');

  release();
});

app.use(mainRouter);

// Centralized Error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false, 
    message: error?.message
  })
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
