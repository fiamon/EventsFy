import { Router } from 'express'

import { createEventController, findAllEventsController, lastestEventController, findByIdController, searchByTitleController, byUserController } from './event.controller.js'
import { authMiddleware } from '../../auth/auth.middleware.js'
import { validateId } from '../../utils/validators/id.validators.js'

const router = Router()

router.post('/', authMiddleware, createEventController)
router.get('/', findAllEventsController)
router.get('/latest', lastestEventController)
router.get('/search', searchByTitleController)
router.get('/ByUser', authMiddleware, byUserController)

router.get('/:id', authMiddleware, validateId, findByIdController)

export default router
