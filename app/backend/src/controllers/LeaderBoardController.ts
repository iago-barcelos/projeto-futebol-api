import { Request, Response } from 'express';

export default class LeaderBoardController {
  public static getLeaderBoard(_req: Request, res: Response): Response {
    return res.status(200).json({ message: 'implementar leader board' });
  }
}
