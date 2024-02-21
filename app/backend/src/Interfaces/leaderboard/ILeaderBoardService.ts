import { ServiceResponse } from '../ServiceResponse';
import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderBoardService{
  getLeaderboard(teamType: string): Promise<ServiceResponse<ILeaderBoard[]>>
}
