import IMatchUpdate from '../../Interfaces/matches/IMatchUpdate';
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

  async updateMatchInProgress(id: number, reqBody: IMatchUpdate): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    if (match == null) return null;
    const { homeTeamGoals, awayTeamGoals } = reqBody;

    const updated = match.update({
      homeTeamGoals,
      awayTeamGoals,
    });

    return updated;
  }

  async finishMatch(id: number): Promise<{ message: string } | null> {
    const match = await this.model.findByPk(id);
    if (match == null) return null;
    match.update(
      { inProgress: false },
      { where: { id } },
    );
    return { message: 'Finished' };
  }
}
