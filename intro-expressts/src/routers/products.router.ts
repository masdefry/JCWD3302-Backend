import { Router } from 'express';
const productsRouter = Router();

import {
  findProductsController,
  createProductController,
  updateProductController,
} from '../controllers/products.controller';

productsRouter.get('/', findProductsController);
productsRouter.post('/', createProductController);
productsRouter.put('/:productId', updateProductController);

export default productsRouter;
