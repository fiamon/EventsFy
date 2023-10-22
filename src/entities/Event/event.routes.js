import { Router } from 'express'

import {
  createEventController,
  findAllEventsController,
  lastestEventController,
  findByIdController,
  searchByTitleController,
  byUserController,
  updateController,
  deleteController,
  addCommentController,
  removeCommentController
} from './event.controller.js'
import { authMiddleware } from '../../auth/auth.middleware.js'
import { validateId } from '../../utils/validators/id.validators.js'

const router = Router()

router.post('/', authMiddleware, createEventController)
router.get('/', findAllEventsController)
router.get('/latest', lastestEventController)
router.get('/search', searchByTitleController)
router.get('/ByUser', authMiddleware, byUserController)
router.get('/:id', authMiddleware, validateId, findByIdController)
router.patch('/:id', authMiddleware, validateId, updateController)
router.delete('/:id', authMiddleware, validateId, deleteController)
router.patch('/comment/:id', authMiddleware, validateId, addCommentController)
router.patch('/comment/:eventId/:commentId', authMiddleware, removeCommentController)

export default router
