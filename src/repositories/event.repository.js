import { Event } from '../models/Event.js'

async function createEvent (event) {
  return await Event.create(event)
}

async function findAllEvents (limit, offset) {
  return await Event
    .find({})
    .populate('owner')
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
}

async function countEvents () {
  return await Event.countDocuments()
}

async function findTheLatestEvent () {
  return await Event
    .findOne()
    .sort({ _id: -1 })
    .populate('owner')
}

async function findEventById (id) {
  return await Event
    .findById({ _id: id })
    .populate('owner')
}

async function findEventByTitle (title) {
  return await Event
    .find({
      title: {
        $regex: `${title || ''}`,
        $options: 'i'
      }
    })
    .sort({ _id: -1 })
    .populate('owner')
}

async function findEventsCreatedByUser (id) {
  return await Event
    .find({ owner: id })
    .populate('owner')
    .sort({ _id: -1 })
}

async function updateEvent (event, title, description, startsAt, endsAt) {
  return await Event
    .updateOne(
      event,
      { title, description, startsAt, endsAt },
      { rowResult: true }
    )
}

async function deleteEvent (id) {
  return await Event.findOneAndDelete(id)
}

async function commentOnAnEvent (id, comment, user) {
  const commentId = Math.floor(Date.now() * Math.random()).toString(36)

  return await Event
    .findOneAndUpdate(
      { _id: id },
      { $push: { comments: { commentId, user, comment, createdAt: new Date() } } }
    )
}

async function removeComment (eventId, commentId, user) {
  return await Event
    .findOneAndUpdate(
      { _id: eventId },
      { $pull: { comments: { commentId, user } } }
    )
}

async function subscribeOnAnEvent (id, user) {
  return await Event
    .findOneAndUpdate(
      { _id: id },
      { $push: { susbscribedPeople: { user } } }
    )
}

export default {
  createEvent,
  findAllEvents,
  countEvents,
  findTheLatestEvent,
  findEventById,
  findEventByTitle,
  findEventsCreatedByUser,
  updateEvent,
  deleteEvent,
  commentOnAnEvent,
  removeComment,
  subscribeOnAnEvent
}
