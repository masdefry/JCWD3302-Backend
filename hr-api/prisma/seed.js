const { PrismaClient } = require('./../src/generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Shifts = [
  { shiftStart: '09:00:00', shiftEnd: '18:00:00' },
  { shiftStart: '13:00:00', shiftEnd: '22:00:00' },
];

const EmployeeHR = [
  {
    name: 'Immanuel Janis',
    email: 'immanuel@gmail.com',
    password: bcrypt.hashSync('abc12345', saltRounds),
    phoneNumber: '6281215163000',
    salary: '8000000',
    leaveBalance: 12,
    role: 'HR',
    isActive: true,
    shiftId: 1,
  },
];

async function main() {
  await prisma.shift.createMany({ data: Shifts });

  await prisma.employee.createMany({ data: EmployeeHR });
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => await prisma.$disconnect());
