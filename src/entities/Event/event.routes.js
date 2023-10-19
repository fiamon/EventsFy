import { Router } from 'express'

import { createEventController, findAllEventsController, lastestEventsController } from './event.controller.js'
import { authMiddleware } from '../../auth/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, createEventController)
router.get('/', findAllEventsController)
router.get('/latest', lastestEventsController)

export default router
