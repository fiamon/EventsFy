import { Event } from '../../DB/models/Event.js'

export const createEvent = async ({ ...event }) => await Event.create(event)

export const findAllEvents = async (limit, offset) => await Event.find({}).populate('owner').sort({ _id: -1 }).skip(offset).limit(limit)

export const countEvents = async () => await Event.countDocuments()

export const latestEvent = async () => await Event.findOne().sort({ _id: -1 }).populate('owner')

export const findById = async (id) => await Event.findById({ _id: id }).populate('owner')

export const findByTitle = async (title) => await Event.find({
  title: { $regex: `${title || ''}`, $options: 'i' }
}).sort({ _id: -1 }).populate('owner')

export const findEventsByUser = async (id) => await Event.find({ owner: id }).populate('owner').sort({ _id: -1 })
