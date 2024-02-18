import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../database/models/MatchModel';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchesInProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.getMatchesInProgress(inProgress);

    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }
}
