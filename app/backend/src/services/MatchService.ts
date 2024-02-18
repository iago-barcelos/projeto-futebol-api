import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchUpdate from '../Interfaces/matches/IMatchUpdate';
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

  public async updateMatchInProgress(
    id: number,
    reqBody: IMatchUpdate,
  ): Promise<ServiceResponse<IMatch | null>> {
    const match = await this.matchModel.updateMatchInProgress(id, reqBody);
    if (!match) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };

    return { status: 'SUCCESSFUL', data: match };
  }

  public async finishMatch(
    id: number,
  ): Promise<ServiceResponse<{ message: string } | null>> {
    const match = await this.matchModel.finishMatch(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };

    return { status: 'SUCCESSFUL', data: match };
  }

  public async createNewMatch(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.createNewMatch(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );

    return { status: 'CREATED', data: newMatch };
  }
}
