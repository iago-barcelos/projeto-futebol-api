import { IMatch } from './IMatch';
import IMatchUpdate from './IMatchUpdate';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatch[]>,
  getMatchesInProgress(inProgress: boolean): Promise<IMatch[]>,
  updateMatchInProgress(id: number, reqBody: IMatchUpdate): Promise<IMatch | null>
  finishMatch(id: number): Promise<{ message: string } | null>,
}
