import { Event } from '../../DB/models/Event.js'

export const createEvent = async ({ ...event }) => await Event.create(event)
export const findAllEvents = async () => await Event.find({}).populate('owner')
