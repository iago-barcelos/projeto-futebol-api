import { NextFunction, Request, Response } from 'express';

export default class UserValidation {
  static validateUserFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}
