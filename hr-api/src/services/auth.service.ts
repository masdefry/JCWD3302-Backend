import prisma from '../db/connection';
import { Employee } from '../generated/prisma';
import bcrypt from 'bcrypt';
import { createJwt } from '../lib/jwt';
import { APIError } from '../utils/api.error';

export const authLoginService = async ({
  email,
  password,
}: Pick<Employee, 'email' | 'password'>) => {
  const findUserByEmail = await prisma.employee.findFirst({ where: { email } });

  if (!findUserByEmail) throw APIError('Account not registered', 404);

  const comparePassword = await bcrypt.compare(
    password,
    findUserByEmail?.password
  ); //Boolean: true/false

  if (!comparePassword) throw APIError('Invalid password', 404);

  const token = await createJwt({
    userId: findUserByEmail?.id,
    role: findUserByEmail?.role,
    secretKey: process.env.JWT_SECRET_KEY!,
    options: {
      expiresIn: '1h',
    },
  });

  return { token, name: findUserByEmail?.name };
};
