import { ITeam } from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `team ${id} not found` } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
