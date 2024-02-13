import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const service = await this.teamService.getAllTeams();
    res.status(200).json(service.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const service = await this.teamService.getTeamById(Number(id));

    if (service.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(service.status)).json(service.data);
    }

    res.status(200).json(service.data);
  }
}
