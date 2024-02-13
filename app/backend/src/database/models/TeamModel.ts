import ITeamModel, { TeamType } from '../../Interfaces/ITeamModel';
import SequelizeTeam from './SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<TeamType[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
