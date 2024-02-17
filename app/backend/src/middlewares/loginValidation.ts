import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';

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

    const joiValidation = joi.object({
      loginEmail: joi.string().regex(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
      password: joi.string().min(6),
    });

    const { error } = joiValidation.validate({ loginEmail: email, password });

    if (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
