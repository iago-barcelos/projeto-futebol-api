import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const checking = inProgress === 'true';
      const service = await this.matchService.getMatchesInProgress(checking);
      return res.status(mapStatusHTTP(service.status)).json(service.data);
    }

    const service = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }

  public async updateMatchInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const service = await this.matchService.updateMatchInProgress(Number(id), req.body);

    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const service = await this.matchService.finishMatch(Number(id));

    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    } = req.body;
    const service = await this.matchService.createNewMatch(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );

    return res.status(mapStatusHTTP(service.status)).json(service.data);
  }
}
