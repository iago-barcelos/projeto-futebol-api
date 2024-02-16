import { NextFunction, Request, Response } from 'express';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserValidation {
  static validateUserFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ServiceResponse<Response> | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return {
        status: 'INVALID_DATA', data: { message: 'All fields must be filled' },
      };
    }

    next();
  }
}
