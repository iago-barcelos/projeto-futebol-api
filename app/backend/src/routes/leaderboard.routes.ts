import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

// const leaderboardController = new LeaderBoardController();

const router = Router();

router.get('/', LeaderBoardController.getLeaderBoard);

export default router;
