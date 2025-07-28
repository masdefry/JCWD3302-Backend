import { Request, Response } from 'express';
import { createRequestTimeOffService } from '../services/timeoff.service';
import { APIError } from '../utils/api.error';

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

  await createRequestTimeOffService({
    timeOffType,
    reason,
    date,
    files,
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
