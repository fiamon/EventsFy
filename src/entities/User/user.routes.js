import { Router } from 'express'

import { createUserController, findAllUsersController, findByIdController } from './user.controller.js'
import { validateId } from './user.middleware.js'

const router = Router()

router.post('/', createUserController)
router.get('/', findAllUsersController)
router.get('/:id', validateId, findByIdController)

export default router
