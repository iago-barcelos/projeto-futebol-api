import { IMatch } from './IMatch';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>,
  getMatchesInProgress(inProgress: boolean): Promise<IMatch[]>,
}
