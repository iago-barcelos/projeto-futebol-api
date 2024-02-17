import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class Token {
  static validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
      const [, token] = authorization.split(' ');
      const payload = jwt.verify(token, secret);
      res.locals.user = payload;
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
