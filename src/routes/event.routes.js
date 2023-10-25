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

const eventRouter = Router()

eventRouter.get('/all', findAllEventsController)
eventRouter.get('/latest', lastestEventController)
eventRouter.get('/search', searchByTitleController)

eventRouter.post('/create', authMiddleware, createEventController)
eventRouter.get('/byUser', authMiddleware, byUserController)

eventRouter.get('/:id', authMiddleware, validateId, findByIdController)
eventRouter.patch('/join/:id', authMiddleware, validateId, joinEventController)
eventRouter.patch('/comment/:id', authMiddleware, validateId, addCommentController)
eventRouter.patch('/comment/:eventId/:commentId', authMiddleware, removeCommentController)
eventRouter.patch('/update/:id', authMiddleware, validateId, updateController)
eventRouter.delete('/delete/:id', authMiddleware, validateId, deleteController)

export default eventRouter
