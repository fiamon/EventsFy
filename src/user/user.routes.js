import { Router } from 'express'

import { createUserController, findAllUsersController } from './user.controller.js'

const router = Router()

router.post('/', createUserController)
router.get('/', findAllUsersController)

export default router
