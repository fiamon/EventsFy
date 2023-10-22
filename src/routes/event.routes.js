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
  removeCommentController,
  joinEventController
} from '../controllers/event.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateId } from '../utils/validators/id.validator.js'

const router = Router()

router.post('/', authMiddleware, createEventController)
router.get('/', findAllEventsController)
router.get('/latest', lastestEventController)
router.get('/search', searchByTitleController)
router.get('/ByUser', authMiddleware, byUserController)
router.get('/:id', authMiddleware, validateId, findByIdController)
router.patch('/join/:id', authMiddleware, validateId, joinEventController)
router.patch('/:id', authMiddleware, validateId, updateController)
router.patch('/comment/:id', authMiddleware, validateId, addCommentController)
router.patch('/comment/:eventId/:commentId', authMiddleware, removeCommentController)
router.delete('/:id', authMiddleware, validateId, deleteController)

export default router
