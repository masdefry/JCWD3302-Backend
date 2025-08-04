import { Request, Response } from 'express';
import { createRequestTimeOffService } from '../services/timeoff.service';

export const createRequestTimeOffController = async (
  req: Request,
  res: Response
) => {
  const files = Array.isArray(req.files)
    ? req.files
    : req.files
    ? (req.files as Record<string, Express.Multer.File[]>).evidence || []
    : [];
  const { timeOffType, reason, date } = req.body;
  const { userId } = res?.locals?.payload;
  console.log(userId);

  await createRequestTimeOffService({
    timeOffType,
    reason,
    date,
    files,
    requestById: userId,
  });

  res.status(201).json({
    success: true,
    message: 'Create request time off successfull',
    data: {
      timeOffType,
      reason,
      date,
    },
  });
};
