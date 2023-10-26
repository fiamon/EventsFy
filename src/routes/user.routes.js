import { Router } from 'express'

import userController from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateId } from '../utils/validators/id.validator.js'

const userRouter = Router()

userRouter.post('/register', userController.createUser)
userRouter.get('/', userController.findAllUsers)
userRouter.get('/:id', validateId, userController.findById)
userRouter.patch('/update/:id', authMiddleware, userController.updateUser)

export default userRouter
