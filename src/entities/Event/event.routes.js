import { Router } from 'express'

import { createEventController, findAllEventsController } from './event.controller.js'
import { } from './event.middleware.js'
import { authMiddleware } from '../Auth/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware, createEventController)
router.get('/', findAllEventsController)

export default router
