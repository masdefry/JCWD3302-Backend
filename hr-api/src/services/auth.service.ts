import prisma from '../db/connection';
import { Employee } from '../generated/prisma';
import bcrypt from 'bcrypt';
import { createJwt } from '../lib/jwt';
import { APIError } from '../utils/api.error';
import { transporter } from '../lib/nodemailer';
import fs from 'fs';
import Handlebars from 'handlebars';

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

  return { token, name: findUserByEmail?.name, role: findUserByEmail?.role };
};

export const authRegisterService = async ({
  name,
  email,
  salary,
  phoneNumber,
  shiftId,
  role,
}: Omit<
  Employee,
  | 'id'
  | 'isActive'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'password'
  | 'leaveBalance'
>) => {
  const findUserByEmail = await prisma.employee.findFirst({ where: { email } });

  if (findUserByEmail)
    throw APIError(`Account with email ${email} already registered`, 404);

  const hashedDefaultPassword = await bcrypt.hash(
    process.env.DEFAULT_PASSWORD_REGISTER_EMPLOYEE!,
    10
  );

  const createdEmployee = await prisma.employee.create({
    data: {
      name,
      email,
      password: hashedDefaultPassword,
      role,
      salary,
      phoneNumber,
      shiftId,
      leaveBalance: 12,
    },
  });

  const token = await createJwt({
    userId: createdEmployee?.id,
    secretKey: process.env.JWT_SECRET_KEY!,
    options: {
      expiresIn: '1h',
    },
  });

  const templateHtml = fs.readFileSync('src/assets/template.html', 'utf-8');
  const compiledTemplateHtml = Handlebars.compile(templateHtml);
  const resultTemplateHtml = compiledTemplateHtml({
    name: name,
    linkUrl: `${process.env.RESET_PASSWORD_URL}/${token}`,
  });

  await transporter.sendMail({
    subject: 'Welcome New Employee',
    sender: 'hrapp@gmail.com',
    to: email,
    html: resultTemplateHtml,
  });
};

export const authSessionLoginService = async ({ id }: Pick<Employee, 'id'>) => {
  const findEmployeeById = await prisma.employee.findUnique({ where: { id } });

  if (!findEmployeeById)
    throw APIError('Authentication session login failed', 400);

  return { name: findEmployeeById?.name, role: findEmployeeById?.role };
};

export const updatePasswordService = async ({
  password,
  id,
}: Pick<Employee, 'password' | 'id'>) => {
  await prisma.employee.update({
    data: { password, isActive: true },
    where: { id },
  });
};
