import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const service = await this.userService.login(email, password);

    res.status(mapStatusHTTP(service.status)).json(service.data);
  }

  public static getRole(_req: Request, res: Response) {
    const { role } = res.locals.user;
    res.status(200).json({ role });
  }
}
