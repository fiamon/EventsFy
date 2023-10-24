import {
  createEvent,
  findAllEvents,
  countEvents,
  latestEvent,
  findById,
  findByTitle,
  findEventsByUser,
  updateEventInfo,
  findOneById,
  deleteEvent,
  addComment,
  removeComment,
  joinEvent
} from '../services/event.service.js'

export async function createEventController (req, res) {
  try {
    const { title, description, startsAt, endsAt, address, maxPeople, spaceImage, comments, susbscribedPeople } = req.body
    if (!title || !description || !startsAt || !endsAt || !address || !maxPeople || !spaceImage) return res.status(400).send({ message: 'Please fill in all fields to create an event' })

    const event = await createEvent({
      owner: req.userId,
      title,
      description,
      startsAt,
      endsAt,
      susbscribedPeople,
      address,
      comments,
      maxPeople,
      spaceImage
    })

    if (!event) return res.status(400).send({ message: 'An error occurred while creating the event. Try again later' })

    res.status(201).send({
      message: 'Event successfully created',
      createdEvent: { event }
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function findAllEventsController (req, res) {
  try {
    let { limit, offset } = req.query

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 10
    }

    if (!offset) {
      offset = 0
    }

    const events = await findAllEvents(limit, offset)
    if (events.length === 0) return res.status(404).send({ message: 'There are no registered events' })

    const total = await countEvents()
    const currentUrl = req.baseUrl

    const next = offset + limit
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previusUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    res.status(200).send({
      nextUrl,
      previusUrl,
      limit,
      offset,
      total,

      results: events.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description,
        comments: item.comments,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        susbscribedPeople: item.susbscribedPeople,
        address: item.address,
        maxPeople: item.maxPeople,
        spaceImage: item.spaceImage,
        owner: item.owner.fullName
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function lastestEventController (req, res) {
  try {
    const event = await latestEvent()
    if (!event) return res.status(400).send({ message: 'There is no registered events' })

    res.send({
      event: {
        id: event._id,
        title: event.title,
        description: event.description,
        comments: event.comments,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        susbscribedPeople: event.susbscribedPeople,
        address: event.address,
        maxPeople: event.maxPeople,
        spaceImage: event.spaceImage,
        owner: event.owner.fullName
      }
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function findByIdController (req, res) {
  try {
    const { id } = req.params

    const event = await findById(id)
    if (!event) return res.status(404).send({ message: 'Event not found!' })

    res.send({
      event: {
        id: event._id,
        title: event.title,
        description: event.description,
        comments: event.comments,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        susbscribedPeople: event.susbscribedPeople,
        address: event.address,
        maxPeople: event.maxPeople,
        spaceImage: event.spaceImage,
        owner: event.owner.fullName
      }
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function searchByTitleController (req, res) {
  try {
    const { title } = req.query

    const event = await findByTitle(title)
    if (!event.length === 0) return res.status(400).send({ message: 'There are no events with this title' })

    res.send({
      results: event.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description,
        comments: item.comments,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        susbscribedPeople: item.susbscribedPeople,
        address: item.address,
        maxPeople: item.maxPeople,
        spaceImage: item.spaceImage,
        owner: item.owner.fullName
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function byUserController (req, res) {
  try {
    const id = req.userId

    const events = await findEventsByUser(id)

    res.send({
      results: events.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description,
        comments: item.comments,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        susbscribedPeople: item.susbscribedPeople,
        address: item.address,
        maxPeople: item.maxPeople,
        spaceImage: item.spaceImage,
        owner: item.owner.fullName
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function updateController (req, res) {
  try {
    const { title, description, startsAt, endsAt } = req.body
    const { id } = req.params

    if (!title && !description && !startsAt && !endsAt) return res.status(400).send({ message: 'Submit at least one field to update the event' })

    const event = await findOneById(id)
    if (!event) return res.status(404).send({ message: 'Event not found!' })

    // eslint-disable-next-line eqeqeq
    if (event.owner._id != req.userId) return res.status(400).send({ message: 'You cant update this post' })

    await updateEventInfo(id, title, description, startsAt, endsAt)

    res.send({ message: 'Post successfully updated!' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function deleteController (req, res) {
  try {
    const { id } = req.params
    const eventToBeDeleted = await findOneById(id)

    // eslint-disable-next-line eqeqeq
    if (eventToBeDeleted.owner._id != req.userId) return res.status(400).send({ message: 'You cant delete this event' })

    await deleteEvent(id, { eventToBeDeleted })

    res.status(200).send({ message: 'Event successfully deleted' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function addCommentController (req, res) {
  try {
    const { id } = req.params
    const userId = req.userId
    const { comment } = req.body

    if (!comment) return res.status(400).send({ message: 'Write a message to comment' })

    await addComment(id, comment, userId)

    res.send({ message: 'Comment successfully completed!' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function removeCommentController (req, res) {
  try {
    const { eventId, commentId } = req.params
    const userId = req.userId

    const removedComment = await removeComment(eventId, commentId, userId)

    const commentFinder = removedComment.comments.find(comment => comment.commentId === commentId)
    if (!commentFinder) return res.status(404).send({ message: 'Comment not found!' })
    if (commentFinder.user !== userId) return res.status(400).send({ message: 'You cant delete this comment' })

    res.send({ message: 'Comment successfully removed!' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function joinEventController (req, res) {
  try {
    const { id } = req.params
    const user = req.userId

    const event = await findOneById(id)
    if (!event) return res.status(404).send({ message: 'event not found!' })

    const isUserAlreadySubscribed = event.susbscribedPeople.find(e => {
      return e.user === user
    })
    if (isUserAlreadySubscribed) return res.status(400).send({ message: 'You are alredy subscribed' })

    if (event.susbscribedPeople.length >= event.maxPeople) return res.status(400).send({ message: 'the event is full' })

    await joinEvent(id, user)
    res.status(200).send({ message: 'Success' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}