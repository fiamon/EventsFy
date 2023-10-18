import { Router } from 'express'

import { createEventController, findAllEventsController } from './event.controller.js'
import { authMiddleware } from '../../auth/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, createEventController)
router.get('/', findAllEventsController)

export default router
