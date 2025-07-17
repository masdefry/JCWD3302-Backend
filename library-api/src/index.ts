import express, { Express, Request, Response } from 'express';
import pool from './db/connection';

const app: Express = express();
app.use(express.json());
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

pool.connect((err, client, release) => {
  if (err) return console.log(`Error acquiring client ${err.stack}`);

  console.log('Connection successful');

  release();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
