import eventRepository from '../repositories/event.repository.js'

async function createEvent (body, userId) {
  const { title, description, startsAt, endsAt, address, maxPeople, spaceImage } = body

  if (!title || !description || !startsAt || !endsAt || !address || !maxPeople || !spaceImage) {
    throw new Error('Please fill in all fields to create an event')
  }

  if (endsAt < startsAt) throw new Error('The end cannot be bigger than the start')

  const event = await eventRepository.createEvent({
    owner: userId,
    title,
    description,
    startsAt,
    endsAt,
    address,
    maxPeople,
    spaceImage
  })
  if (!event) throw new Error('An error occurred while creating the event. Try again later')

  return {
    message: 'Event successfully created',
    createdEvent: event
  }
}

async function findAllEvents (limit, offset, currentUrl) {
  limit = Number(limit)
  offset = Number(offset)

  if (!limit || limit <= 0) {
    limit = 10
  }

  if (!offset) {
    offset = 0
  }

  const events = await eventRepository.findAllEvents(limit, offset)
  const total = await eventRepository.countEvents()

  if (events.length === 0) throw new Error('There are no registered events')

  const next = offset + limit
  const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

  const previous = offset - limit < 0 ? null : offset - limit
  const previusUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

  return {
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
  }
}

async function findThelastestEvent () {
  const event = await eventRepository.findTheLatestEvent()
  if (!event) throw new Error('There is no registered events')

  return {
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
  }
}

async function findById (id) {
  const event = await eventRepository.findEventById(id)
  if (!event) throw new Error('Event not found!')

  return {
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
  }
}

async function searchByTitle (title) {
  const event = await eventRepository.findEventByTitle(title)
  if (!event.length === 0) throw new Error('There are no events with this title')

  return {
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
  }
}

async function findEventsCreatedbyUser (userId) {
  const events = await eventRepository.findEventsCreatedByUser(userId)

  return {
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
  }
}

async function updateEvent (body, id, userId) {
  const { title, description, startsAt, endsAt } = body
  if (!title && !description && !startsAt && !endsAt) throw new Error('Submit at least one field to update the event')

  const event = await eventRepository.findEventById(id)
  if (!event) throw new Error('Event not found!')

  // eslint-disable-next-line eqeqeq
  if (event.owner._id != userId) throw new Error('You cant update this post')

  await eventRepository.updateEvent(event, title, description, startsAt, endsAt)

  return { message: 'Post successfully updated!' }
}

async function deleteEvent (id, userId) {
  const eventToBeDeleted = await eventRepository.findEventById(id)

  // eslint-disable-next-line eqeqeq
  if (eventToBeDeleted.owner._id != userId) throw new Error('You cant delete this event')

  await eventRepository.deleteEvent(id)

  return { message: 'Event successfully deleted' }
}

async function addComment (id, userId, comment) {
  if (!comment) throw new Error('Write a message to comment')

  await eventRepository.commentOnAnEvent(id, comment, userId)

  return { message: 'Comment successfully completed!' }
}

async function removeComment (eventId, commentId, userId) {
  const removedComment = await eventRepository.removeComment(eventId, commentId, userId)

  const commentFinder = removedComment.comments.find(comment => comment.commentId === commentId)
  if (!commentFinder) throw new Error('Comment not found!')
  if (commentFinder.user !== userId) throw new Error('You cant delete this comment')

  return { message: 'Comment successfully removed!' }
}

async function joinEvent (id, userId) {
  const event = await eventRepository.findEventById(id)
  if (!event) throw new Error('event not found!')

  const isUserAlreadySubscribed = event.susbscribedPeople.find(e => {
    return e.user === userId
  })
  if (isUserAlreadySubscribed) throw new Error('You are alredy subscribed')

  if (event.susbscribedPeople.length >= event.maxPeople) throw new Error('the event is full')

  await eventRepository.subscribeOnAnEvent(id, userId)
  return { message: 'Success' }
}

export default {
  createEvent,
  findAllEvents,
  findThelastestEvent,
  findById,
  searchByTitle,
  findEventsCreatedbyUser,
  updateEvent,
  deleteEvent,
  addComment,
  removeComment,
  joinEvent
}
