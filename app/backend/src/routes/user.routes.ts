import { Request, Response, Router } from 'express';
import UserValidation from '../middlewares/loginValidation';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  UserValidation.validateUserFields,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
