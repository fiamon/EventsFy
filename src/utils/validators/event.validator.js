import Joi from 'joi'

async function createEvent (data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(30),
    description: Joi.string().min(5).max(200),
    startsAt: Joi.date().min('now'),
    endsAt: Joi.date(),
    address: Joi.string().min(5).max(60),
    maxPeople: Joi.number(),
    imageOfThePlace: Joi.string()
  })
  return schema.validate(data)
}

async function updateEvent (data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(30).optional(),
    description: Joi.string().min(5).max(200).optional(),
    startsAt: Joi.date().min('now').optional(),
    endsAt: Joi.date().optional()
  })
  return schema.validate(data)
}

export default {
  createEvent,
  updateEvent
}
