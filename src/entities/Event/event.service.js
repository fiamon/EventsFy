import { Event } from '../../DB/models/Event.js'

export const createEvent = async ({ ...event }) => await Event.create(event)

export const findAllEvents = async (limit, offset) => await Event.find({}).populate('owner').sort({ _id: -1 }).skip(offset).limit(limit)

export const countNews = async () => await Event.countDocuments()
