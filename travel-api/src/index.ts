import express, { Request, Response, Application } from 'express';
import mainRouter from './routers/index.router';

const PORT = 8000;
const app: Application = express();

// Initialize body parser (supaya express dapat menerima req.body)
app.use(express.json());

app.use(mainRouter);

app.get('/api', (_: Request, res: Response) => {
  return res.status(200).json({
    message: 'Welcome to our API',
  });
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
