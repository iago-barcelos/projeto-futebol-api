import { Request, Response, Router } from 'express';
import TokenValidation from '../middlewares/tokenValidation';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id',
  TokenValidation.validate,
  (req: Request, res: Response) => matchController.updateMatchInProgress(req, res),
);

router.patch(
  '/:id/finish',
  TokenValidation.validate,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
