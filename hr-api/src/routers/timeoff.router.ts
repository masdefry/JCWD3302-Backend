import { Router } from 'express';
import { createRequestTimeOffController } from '../controllers/timeoff.controller';
import { uploaderMulter } from '../middlewares/uploader.multer';
const timeOffRouter = Router();

timeOffRouter.post(
  '/request',
  uploaderMulter(['image'], 'memory').fields([
    { name: 'evidence', maxCount: 3 },
  ]),
  createRequestTimeOffController
);

export default timeOffRouter;
