import { Request, Response } from 'express';
import {
  authLoginService,
  authRegisterService,
  authSessionLoginService,
  updatePasswordService,
} from '../services/auth.service';
import { resolve } from 'url';

export const authLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { token, name, role } = await authLoginService({ email, password });

  res.status(200).json({
    success: true,
    message: 'Auth login successful',
    data: {
      token,
      name,
      role,
    },
  });
};

export const authRegisterController = async (req: Request, res: Response) => {
  const { name, email, salary, phoneNumber, shiftId, role } = req.body;

  await authRegisterService({
    name,
    email,
    salary,
    phoneNumber,
    shiftId: parseInt(shiftId),
    role,
  });

  res.status(201).json({
    success: true,
    message: 'Register new employee successfull',
    data: {
      name,
      email,
      phoneNumber,
      role,
    },
  });
};

export const authSessionLoginController = async (_: Request, res: Response) => {
  const { userId } = res.locals.payload;

  const { name, role } = await authSessionLoginService({ id: userId });

  res.status(200).json({
    success: true,
    message: 'Authentication session login successfull',
    data: { name, role },
  });
};

export const updatePasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { userId } = res.locals.payload;

  await updatePasswordService({ password, id: userId });

  res.status(200).json({
    success: true,
    message: `Password updated successfully`,
  });
};

// Emailer
// Register employee -> HR -> Password default abc12345
// Employee diharuskan untuk me-reset password sekaligus mengaktivasi akunnya
