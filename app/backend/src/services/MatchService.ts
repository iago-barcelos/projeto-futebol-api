import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchUpdate from '../Interfaces/matches/IMatchUpdate';
import MatchModel from '../database/models/MatchModel';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
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

  // eslint-disable-next-line max-lines-per-function
  public async createNewMatch(matchInfo: IMatch): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = matchInfo;
    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const bothTeams = [homeTeamId, awayTeamId];
    const getBothTeams = await Promise.all(
      bothTeams.map((teamId) => this.teamModel.findById(teamId)),
    );

    if (getBothTeams.includes(null)) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatch = await this.matchModel.createNewMatch(matchInfo);
    return { status: 'CREATED', data: newMatch };
  }
}
