import { NextFunction, Request, Response } from 'express';
import { createMemberService } from '../services/members.service/members.service';

export const createMemberController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, phonenumber } = req.body;

    const memberId = await createMemberService({phonenumber, fullname})

    res.status(201).json({
      success: true, 
      message: `Create new member successful with memberId = ${memberId}`
    })
  } catch (error) {
    next(error);
  }
};