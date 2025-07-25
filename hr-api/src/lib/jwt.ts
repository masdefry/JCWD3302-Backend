import jwt, { SignOptions } from 'jsonwebtoken';

interface ICreateJwtProps {
  userId: string;
  role?: string;
  secretKey: string;
  options: SignOptions;
}

export const createJwt = async ({
  userId,
  role,
  secretKey,
  options,
}: ICreateJwtProps) => {
  return await jwt.sign({ userId, role }, secretKey, options);
};
