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
}
