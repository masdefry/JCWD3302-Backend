import { Employee } from '../../generated/prisma';
import prisma from '../../db/connection';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const createEmployeeService = async ({
  name,
  email,
  password,
  phoneNumber,
  salary,
  role,
  shiftId,
}: Omit<Employee, 'id' | 'leaveBalance'>) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.employee.create({
        data: {
            name, 
            email, 
            password: hashedPassword, 
            phoneNumber, 
            salary, 
            role, 
            shiftId, 
            leaveBalance: 12
        }
    })
};
