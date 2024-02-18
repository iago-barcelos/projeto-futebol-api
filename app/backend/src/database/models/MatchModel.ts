import { IMatch } from '../../Interfaces/matches/IMatch';
import IMatchModel from '../../Interfaces/matches/IMatchModel';
import SequelizeMatch from './SequelizeMatch';
import SequelizeTeam from './SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async getAllMatches(): Promise<IMatch[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return allMatches;
  }

  async getMatchesInProgress(inProgress: boolean): Promise<IMatch[]> {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesInProgress;
  }
}
