import Joi from 'joi'

async function createUser (data) {
  const schema = Joi.object({
    username: Joi.string().required().min(2).max(20),
    email: Joi.string().required().min(5).max(20).email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(6).max(20),
    fullName: Joi.string().required().min(2).max(40),
    avatar: Joi.string(),
    contact: Joi.array().items(Joi.string())
  })
  return schema.validate(data)
}

async function login (data) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(20).email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(6).max(20)
  })

  return schema.validate(data)
}

export default {
  createUser,
  login
}
