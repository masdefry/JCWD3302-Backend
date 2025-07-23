import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { APIError } from '../utils/api.error';
import { Role } from '../generated/prisma';

export const jwtVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw APIError('Token must be provide', 401);

  const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY!);

  res.locals.payload = payload;

  next();
};

// HOC (High Order Component)
// Function yg me-return function lain
export const verifyRole = (authorizeRole: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.payload;
    // authorizeRole = [HR, MANAGER]
    if (!authorizeRole.includes(role))
      throw APIError('User role unauthorized access', 401);

    next();
  };
};
