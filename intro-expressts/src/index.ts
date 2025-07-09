import express, { Request, Response, Application } from 'express';
import fs from 'fs';

const PORT = 8000;
const app: Application = express();

// Initialize body parser (supaya express dapat menerima req.body)
app.use(express.json());

app.get('/api', (_: Request, res: Response) => {
  return res.status(200).json({
    message: 'Welcome to our API',
  });
});

app.get('/api/products', async (_: Request, res: Response) => {
  const db = fs.readFileSync('./src/db/db.json', 'utf-8'); // file system (membaca isi file)
  const dbParse = await JSON.parse(db);

  return res.status(200).json({
    message: 'Get products successfull',
    products: dbParse?.products,
  });
});

app.post('/api/products', async function (req: Request, res: Response) {
  // Step-01: Ambil req data (req.url, req.headers, req.body)
  const { name, price, stocks } = req.body;

  // Step-02.0: Read file
  const db = fs.readFileSync('./src/db/db.json', 'utf-8'); // file system (membaca isi file)
  const dbParse = await JSON.parse(db);

  dbParse?.products?.push({ name, price, stocks }); 
  
  //   // Step-02.1: Submit req data to db.json
  fs.writeFileSync('./src/db/db.json', JSON.stringify(dbParse));

  // Step-03: Send response
  res.status(201).json({
    message: 'Post product successfull'
  })
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
