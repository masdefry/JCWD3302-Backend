import { Request, Response } from 'express';
import { createEmployeeService } from '../services/employee.service/employee.service';

export const createEmployeeController = async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber, salary, role, shiftId } =
    req.body;

  await createEmployeeService({
    name,
    email,
    password,
    phoneNumber,
    salary,
    role,
    shiftId,
  });

  res.status(201).json({
    success: true,
    message: 'Create new employee successful',
    data: {
      name,
      email,
      phoneNumber,
      salary,
      role,
      shiftId,
    },
  });
};
