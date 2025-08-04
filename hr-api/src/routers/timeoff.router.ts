import { Router } from 'express';
import { createRequestTimeOffController } from '../controllers/timeoff.controller';
import { uploaderMulter } from '../middlewares/uploader.multer';
import { jwtVerify } from '../middlewares/auth.middleware';
const timeOffRouter = Router();

timeOffRouter.post(
  '/request',
  jwtVerify,
  uploaderMulter(['image'], 'memory').fields([
    { name: 'evidence', maxCount: 3 },
  ]),
  createRequestTimeOffController
);

export default timeOffRouter;
