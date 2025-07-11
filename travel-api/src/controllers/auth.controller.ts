import { Request, Response } from 'express';
import { readFile } from './../utils/read.file';
import fs from 'fs';

export const authLogin = async (req: Request, res: Response) => {};

export const authRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const dbUsers = await readFile('./src/db/users.jsonsss'); // { users: [] }

    const findUserByUsernameOrEmail = dbUsers?.users?.find(
      (user: any) => user?.username === username || user?.email === email
    );

    if (findUserByUsernameOrEmail)
      throw {
        isOperational: true,
        status: 400,
        message: 'Username or email has been used',
      };

    const uid = Date.now();
    dbUsers?.users?.push({
      uid,
      username,
      email,
      password,
      role: 'USER',
    });

    fs.writeFileSync('./src/db/users.json', JSON.stringify(dbUsers));

    res.status(201).json({
      isSuccess: true,
      message: 'Register user successfull',
      uid,
    });
  } catch (error: any) {
    res.status(error?.isOperational ? error?.status : 500).json({
      message: error?.isOperational ? error?.message : 'Internal server error',
    });
  }
};
