import eventService from '../services/event.service.js'

async function createEvent (req, res) {
  const userId = req.userId
  const body = req.body

  try {
    const event = await eventService.createEvent(body, userId)
    return res.status(201).send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function findAllEvents (req, res) {
  const { limit, offset } = req.query
  const currentUrl = req.baseUrl

  try {
    const events = await eventService.findAllEvents(limit, offset, currentUrl)
    return res.send(events)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function findThelastestEvent (req, res) {
  try {
    const event = await eventService.findThelastestEvent()
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function findEventById (req, res) {
  const { id } = req.params

  try {
    const event = await eventService.findById(id)
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function searchEventByTitle (req, res) {
  const { title } = req.query

  try {
    const event = await eventService.searchByTitle(title)
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function findEventsCreatedbyUser (req, res) {
  const userId = req.userId

  try {
    const events = await eventService.findEventsCreatedbyUser(userId)
    return res.send(events)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function updateEvent (req, res) {
  const { title, description, startsAt, endsAt } = req.body
  const { id } = req.params
  const userId = req.userId

  try {
    const updatedEvent = await eventService.updateEvent({ title, description, startsAt, endsAt }, id, userId)
    return res.send(updatedEvent)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function deleteEvent (req, res) {
  const { id } = req.params
  const userId = req.userId

  try {
    const deletedEvent = await eventService.deleteEvent(id, userId)
    return res.send(deletedEvent)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function addComment (req, res) {
  const { id } = req.params
  const userId = req.userId
  const { comment } = req.body

  try {
    const userComment = await eventService.addComment(id, userId, comment)
    return res.send(userComment)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function removeComment (req, res) {
  const { eventId, commentId } = req.params
  const userId = req.userId

  try {
    const removedComment = await eventService.removeComment(eventId, commentId, userId)
    return res.send(removedComment)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function joinEvent (req, res) {
  const { id } = req.params
  const userId = req.userId

  try {
    const event = await eventService.joinEvent(id, userId)
    return res.send(event)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export default {
  joinEvent,
  removeComment,
  addComment,
  deleteEvent,
  updateEvent,
  findEventsCreatedbyUser,
  searchEventByTitle,
  findEventById,
  findThelastestEvent,
  findAllEvents,
  createEvent
}
