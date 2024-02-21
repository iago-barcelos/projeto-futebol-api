import IMatchModel from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/leaderboard/ILeaderBoard';
import { ILeaderBoardService } from '../Interfaces/leaderboard/ILeaderBoardService';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import leaderBoardFunctions, { TeamType } from '../utils/leaderboard';

export default class LeaderBoardService implements ILeaderBoardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  async getLeaderboard(teamType: TeamType): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matchesConcluded = await this.matchModel.getMatchesInProgress(false);
    const allTeams = await this.teamModel.findAll();
    const leaderboard = allTeams.map(
      (team) => leaderBoardFunctions.getLeaderBoard(team, matchesConcluded, teamType),
    );
    leaderBoardFunctions.getLeaderBoardClass(leaderboard);

    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
