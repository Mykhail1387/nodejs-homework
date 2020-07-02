import { Router } from 'express';
import {
    getUsersController,
    createUserController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} from './user.controller';
import { userValidateMiddleware } from './user.validator';
import { tokenMiddleware, subscriptionMiddleware, currentUser } from '../middlewares/auth.middleware';


const userRouter = Router();

userRouter.get('/', tokenMiddleware, subscriptionMiddleware(['free', 'pro', 'premium']), getUsersController)
userRouter.get('/current', tokenMiddleware, subscriptionMiddleware(['free', 'pro', 'premium']), currentUser)
userRouter.get('/:id', tokenMiddleware, subscriptionMiddleware(['free', 'pro', 'premium']), getUserByIdController)
userRouter.post('/', tokenMiddleware, subscriptionMiddleware(['free', 'pro', 'premium']), userValidateMiddleware, createUserController)
userRouter.delete('/:id', tokenMiddleware, subscriptionMiddleware(['free', 'pro', 'premium']), deleteUserController)
userRouter.put('/', tokenMiddleware, subscriptionMiddleware(['free', 'pro', 'premium']), updateUserController)


export default userRouter;