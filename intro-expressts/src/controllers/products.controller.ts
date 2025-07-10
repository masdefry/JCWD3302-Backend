import { Request, Response } from 'express';
import fs from 'fs';
import { readFile } from '../utils/read.file';

export const findProductsController = async (req: Request, res: Response) => {
  const db = fs.readFileSync('./src/db/db.json', 'utf-8'); // file system (membaca isi file)
  const dbParse = await JSON.parse(db);

  return res.status(200).json({
    message: 'Get products successfull',
    products: dbParse?.products,
  });
};

export const createProductController = async (req: Request, res: Response) => {
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
    message: 'Post product successfull',
  });
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    // Step-01 Ambil req.data
    const { name, price, stocks } = req.body;
    const { productId } = req.params;

    // Step-02 Read file db.json
    const dbParse = await readFile('./src/db/db.json');

    // Step-03 Manipulasi data
    const findIndexOfProduct = dbParse?.products?.findIndex((product) => {
      return product?.id == productId;
    });

    if (findIndexOfProduct === -1)
      throw new Error(`Product with id = ${productId} not found`);

    dbParse?.products?.splice(findIndexOfProduct, 1, {
      id: dbParse?.products[findIndexOfProduct]?.id,
      name,
      price,
      stocks,
    });

    fs.writeFileSync('./src/db/db.json', JSON.stringify(dbParse));

    // Step-04 Send response
    res.status(201).json({
      isSuccess: true,
      message: `Update product with id = ${productId} successfull`,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error?.message
    })
  }
};



req.headers['authorization']