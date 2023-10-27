import { Event } from '../models/Event.js'

function createEvent (event) {
  return Event.create(event)
}

function findAllEvents (limit, offset) {
  return Event
    .find({})
    .populate('owner')
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
}

function countEvents () {
  return Event.countDocuments()
}

function findTheLatestEvent () {
  return Event
    .findOne()
    .sort({ _id: -1 })
    .populate('owner')
}

function findEventById (id) {
  return Event
    .findById({ _id: id })
    .populate('owner')
}

function findEventByTitle (title) {
  return Event
    .find({
      title: {
        $regex: `${title || ''}`,
        $options: 'i'
      }
    })
    .sort({ _id: -1 })
    .populate('owner')
}

function findEventsCreatedByUser (id) {
  return Event
    .find({ owner: id })
    .populate('owner')
    .sort({ _id: -1 })
}

function updateEvent (event, title, description, startsAt, endsAt) {
  return Event
    .updateOne(
      event,
      { title, description, startsAt, endsAt },
      { rowResult: true }
    )
}

function deleteEvent (id) {
  return Event.findOneAndDelete(id)
}

function commentOnAnEvent (id, comment, user) {
  const commentId = Math.floor(Date.now() * Math.random()).toString(36)

  return Event
    .findOneAndUpdate(
      { _id: id },
      { $push: { comments: { commentId, user, comment, createdAt: new Date() } } }
    )
}

function removeComment (eventId, commentId, user) {
  return Event
    .findOneAndUpdate(
      { _id: eventId },
      { $pull: { comments: { commentId, user } } }
    )
}

function subscribeOnAnEvent (id, user) {
  return Event
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
