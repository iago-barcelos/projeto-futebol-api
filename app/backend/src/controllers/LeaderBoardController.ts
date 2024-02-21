import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  public async getAllTeamsLeaderBoard(_req: Request, res: Response) {
    const service = await this.leaderBoardService.getLeaderboard('all');

    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }

  public async getHomeTeamLeaderBoard(_req: Request, res: Response) {
    const service = await this.leaderBoardService.getLeaderboard('home');

    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }

  public async getAwayTeamLeaderBoard(_req: Request, res: Response) {
    const service = await this.leaderBoardService.getLeaderboard('away');

    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }
}
