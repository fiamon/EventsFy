import { Router } from 'express'

import { createUserController, findAllUsersController, findByIdController, editUser } from './user.controller.js'
import { validateId } from '../../utils/validators/id.validators.js'

const router = Router()

router.post('/', createUserController)
router.get('/', findAllUsersController)
router.get('/:id', validateId, findByIdController)
router.patch('/:id', validateId, editUser)

export default router
