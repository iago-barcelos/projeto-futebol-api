import { ITeamStats } from '../Interfaces/teams/ITeamStats';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ILeaderBoard } from '../Interfaces/leaderboard/ILeaderBoard';
import { ITeam } from '../Interfaces/teams/ITeam';

export type TeamType = 'home' | 'away' | 'all';

const getTotalGames = (id: number, matches: IMatch[], teamType: TeamType): IMatch[] => {
  switch (teamType) {
    case 'home': {
      const homeTeamsFilter = matches.filter((match) => match.homeTeamId === id);
      return homeTeamsFilter;
    }
    case 'away': {
      const awaytTeamsFilter = matches.filter((match) => match.awayTeamId === id);
      return awaytTeamsFilter;
    }
    default: {
      const allTeamsFilter = matches.filter(
        (match) => match.homeTeamId === id || match.awayTeamId === id,
      );
      return allTeamsFilter;
    }
  }
};

const getVictories = (id: number, matches: IMatch[], teamType: TeamType): number => {
  let victories = 0;

  matches.forEach((match) => {
    if (!match.inProgress) {
      const isHomeTeam = match.homeTeamId === id;
      const isAwayTeam = match.awayTeamId === id;

      if ((teamType === 'home' && !isHomeTeam) || (teamType === 'away' && !isAwayTeam)) return;

      if ((
        isHomeTeam && match.homeTeamGoals > match.awayTeamGoals
      ) || (
        isAwayTeam && match.awayTeamGoals > match.homeTeamGoals
      )) {
        victories += 1;
      }
    }
  });

  return victories;
};

const getDraws = (id: number, matches: IMatch[], teamType: TeamType): number => {
  let draws = 0;

  matches.forEach((match) => {
    if (!match.inProgress) {
      const isHomeTeam = match.homeTeamId === id;
      const isAwayTeam = match.awayTeamId === id;

      if ((teamType === 'home' && !isHomeTeam) || (teamType === 'away' && !isAwayTeam)) return;

      if (match.homeTeamGoals === match.awayTeamGoals && (isHomeTeam || isAwayTeam)) {
        draws += 1;
      }
    }
  });

  return draws;
};

const getLosses = (id: number, matches: IMatch[], teamType: TeamType): number => {
  let losses = 0;

  matches.forEach((match) => {
    if (!match.inProgress) {
      const isHomeTeam = match.homeTeamId === id;
      const isAwayTeam = match.awayTeamId === id;

      if ((teamType === 'home' && !isHomeTeam) || (teamType === 'away' && !isAwayTeam)) return;

      if ((
        isHomeTeam && match.homeTeamGoals < match.awayTeamGoals
      ) || (
        isAwayTeam && match.awayTeamGoals < match.homeTeamGoals
      )) {
        losses += 1;
      }
    }
  });

  return losses;
};

const getTotalPoints = (id: number, matches: IMatch[], teamType: TeamType): number => {
  const victories = getVictories(id, matches, teamType);
  const draws = getDraws(id, matches, teamType);

  return victories * 3 + draws;
};

const getTeamStats = (id: number, matches: IMatch[]): ITeamStats => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    if (match.homeTeamId === id && !match.inProgress) {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    } else if (match.awayTeamId === id && !match.inProgress) {
      goalsFavor += match.awayTeamGoals;
      goalsOwn += match.homeTeamGoals;
    }
  });

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const getEfficiency = (id: number, matches: IMatch[], teamType: TeamType): number => {
  const totalPoints = getTotalPoints(id, matches, teamType);
  const totalGames = getVictories(id, matches, teamType)
  + getDraws(id, matches, teamType)
  + getLosses(id, matches, teamType);

  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
};

const getLeaderBoard = (team: ITeam, matches: IMatch[], teamType: TeamType): ILeaderBoard => {
  const { goalsFavor, goalsBalance, goalsOwn } = getTeamStats(team.id, matches);

  const leaderboard = {
    name: team.teamName,
    totalPoints: getTotalPoints(team.id, matches, teamType),
    totalGames: getTotalGames(team.id, matches, teamType).length,
    totalVictories: getVictories(team.id, matches, teamType),
    totalDraws: getDraws(team.id, matches, teamType),
    totalLosses: getLosses(team.id, matches, teamType),
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency: getEfficiency(team.id, matches, teamType),
  };

  return leaderboard;
};

const getLeaderBoardClass = (teams: ILeaderBoard[]): ILeaderBoard[] => {
  teams.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  return teams;
};

export default {
  getLeaderBoard,
  getLeaderBoardClass,
};
