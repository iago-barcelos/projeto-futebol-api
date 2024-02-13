export type TeamType = {
  id: number,
  teamName: string,
};

export default interface ITeamModel {
  findAll(): Promise<TeamType[]>
}
