import { Router } from 'express';
import { userValidateMiddleware } from '../users/user.validator';
import {
    registrationController,
    loginController
} from './auth.Controller';
import { tokenMiddleware, tokenCheck } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', userValidateMiddleware, registrationController);
authRouter.post('/login', loginController);
authRouter.post('/logout', tokenMiddleware, tokenCheck)

export default authRouter;