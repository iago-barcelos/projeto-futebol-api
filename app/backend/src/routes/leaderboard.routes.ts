import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderboardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeTeamLeaderBoard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayTeamLeaderBoard(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAllTeamsLeaderBoard(req, res),
);

export default router;
