import { Event } from '../models/Event.js'

export const createEvent = async ({ ...event }) => await Event.create(event)

export const findAllEvents = async (limit, offset) => await Event.find({}).populate('owner').sort({ _id: -1 }).skip(offset).limit(limit)

export const countEvents = async () => await Event.countDocuments()

export const latestEvent = async () => await Event.findOne().sort({ _id: -1 }).populate('owner')

export const findById = async (id) => await Event.findById({ _id: id }).populate('owner')

export const findByTitle = async (title) => await Event.find({
  title: { $regex: `${title || ''}`, $options: 'i' }
}).sort({ _id: -1 }).populate('owner')

export const findEventsByUser = async (id) => await Event.find({ owner: id }).populate('owner').sort({ _id: -1 })

export const updateEventInfo = async (id, title, description, startsAt, endsAt) => await Event.findOneAndUpdate({ _id: id }, { title, description, startsAt, endsAt }, { rowResult: true })

export const findOneById = async (id) => await Event.findOne({ _id: id })

export const deleteEvent = async (id) => await Event.findOneAndDelete(id)

export const addComment = async (id, comment, user) => {
  const commentId = Math.floor(Date.now() * Math.random()).toString(36)

  return await Event.findOneAndUpdate({ _id: id }, { $push: { comments: { commentId, user, comment, createdAt: new Date() } } })
}

export const removeComment = async (eventId, commentId, user) => await Event.findOneAndUpdate({ _id: eventId }, { $pull: { comments: { commentId, user } } })

export const joinEvent = async (id, user) => await Event.findOneAndUpdate({ _id: id }, { $push: { susbscribedPeople: { user } } })
