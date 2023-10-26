import { Router } from 'express'

import eventController from '../controllers/event.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateId } from '../utils/validators/id.validator.js'

const eventRouter = Router()

eventRouter.get('/', eventController.findAllEvents)
eventRouter.get('/latest', eventController.findThelastestEvent)
eventRouter.get('/search', eventController.searchEventByTitle)

eventRouter.post('/create', authMiddleware, eventController.createEvent)
eventRouter.get('/byUser', authMiddleware, eventController.findEventsCreatedbyUser)

eventRouter.get('/:id', authMiddleware, validateId, eventController.findEventById)
eventRouter.patch('/join/:id', authMiddleware, validateId, eventController.joinEvent)
eventRouter.patch('/comment/:id', authMiddleware, validateId, eventController.addComment)
eventRouter.patch('/comment/:eventId/:commentId', authMiddleware, eventController.removeComment)
eventRouter.patch('/update/:id', authMiddleware, validateId, eventController.updateEvent)
eventRouter.delete('/delete/:id', authMiddleware, validateId, eventController.deleteEvent)

export default eventRouter
