import express, { Express, Request, Response, NextFunction } from 'express';
import prisma from './db/connection';

const app: Express = express();
app.use(express.json());
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

app.get('/api/users', async (req: Request, res: Response) => {
  await prisma.user.findMany();
});

// Centralized Error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error?.message,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
