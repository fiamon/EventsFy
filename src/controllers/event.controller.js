import {
  createEventService,
  findAllEventsService,
  lastestEventService,
  findByIdService,
  searchByTitleService,
  findEventsCreatedbyUserService,
  updateEventService,
  deleteEventService,
  addCommentService,
  removeCommentService,
  joinEventService
} from '../services/event.service.js'

export async function createEventController (req, res) {
  const userId = req.userId
  const body = req.body

  try {
    const event = await createEventService(body, userId)
    return res.status(201).send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function findAllEventsController (req, res) {
  const { limit, offset } = req.query
  const currentUrl = req.baseUrl

  try {
    const events = await findAllEventsService(limit, offset, currentUrl)
    return res.send(events)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function lastestEventController (req, res) {
  try {
    const event = await lastestEventService()
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function findByIdController (req, res) {
  const { id } = req.params

  try {
    const event = await findByIdService(id)
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function searchByTitleController (req, res) {
  const { title } = req.query

  try {
    const event = await searchByTitleService(title)
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function byUserController (req, res) {
  const userId = req.userId

  try {
    const events = await findEventsCreatedbyUserService(userId)
    return res.send(events)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function updateController (req, res) {
  const { title, description, startsAt, endsAt } = req.body
  const { id } = req.params
  const userId = req.userId

  try {
    const updatedEvent = await updateEventService({ title, description, startsAt, endsAt }, id, userId)
    return res.send(updatedEvent)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function deleteController (req, res) {
  const { id } = req.params
  const userId = req.userId

  try {
    const deletedEvent = await deleteEventService(id, userId)
    return res.send(deletedEvent)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function addCommentController (req, res) {
  const { id } = req.params
  const userId = req.userId
  const { comment } = req.body

  try {
    const userComment = await addCommentService(id, userId, comment)
    return res.send(userComment)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function removeCommentController (req, res) {
  const { eventId, commentId } = req.params
  const userId = req.userId

  try {
    const removedComment = await removeCommentService(eventId, commentId, userId)
    return res.send(removedComment)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function joinEventController (req, res) {
  const { id } = req.params
  const userId = req.userId

  try {
    const event = await joinEventService(id, userId)
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
