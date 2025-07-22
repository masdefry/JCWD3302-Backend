import { Request, Response } from 'express';
import { authLoginService } from '../services/auth.service';

export const authLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { token, name } = await authLoginService({ email, password });

  res.status(200).json({
    success: true,
    message: 'Auth login successful',
    data: {
      token,
      name
    },
  });
};
