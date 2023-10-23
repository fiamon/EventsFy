import { Router } from 'express'

import {
  createUserController,
  findAllUsersController,
  findByIdController,
  updateUserController
} from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateId } from '../utils/validators/id.validator.js'

const userRouter = Router()

userRouter.post('/', createUserController)
userRouter.get('/', findAllUsersController)
userRouter.get('/:id', validateId, findByIdController)
userRouter.patch('/:id', authMiddleware, updateUserController)

export default userRouter
