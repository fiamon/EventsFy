import { Event } from '../models/Event.js'

export async function createEventRepository (event) {
  console.log(event)
  return await Event.create(event)
}

export async function findAllEventsRepository (limit, offset) {
  return await Event
    .find({})
    .populate('owner')
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
}

export async function countEventsRepository () {
  return await Event.countDocuments()
}

export async function findTheLatestEventRepository () {
  return await Event
    .findOne()
    .sort({ _id: -1 })
    .populate('owner')
}

export async function findEventByIdRepository (id) {
  return await Event
    .findById({ _id: id })
    .populate('owner')
}

export async function findEventByTitleRepository (title) {
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

export async function findEventsCreatedByUserRepository (id) {
  return await Event
    .find({ owner: id })
    .populate('owner')
    .sort({ _id: -1 })
}

export async function updateEventRepository (event, title, description, startsAt, endsAt) {
  return await Event
    .updateOne(
      event,
      { title, description, startsAt, endsAt },
      { rowResult: true }
    )
}

export async function deleteEventRepository (id) {
  return await Event.findOneAndDelete(id)
}

export async function commentOnAnEventRepository (id, comment, user) {
  const commentId = Math.floor(Date.now() * Math.random()).toString(36)

  return await Event
    .findOneAndUpdate(
      { _id: id },
      { $push: { comments: { commentId, user, comment, createdAt: new Date() } } }
    )
}

export async function removeCommentRepository (eventId, commentId, user) {
  return await Event
    .findOneAndUpdate(
      { _id: eventId },
      { $pull: { comments: { commentId, user } } }
    )
}

export async function subscribeOnAnEventRepository (id, user) {
  return await Event
    .findOneAndUpdate(
      { _id: id },
      { $push: { susbscribedPeople: { user } } }
    )
}
