import { User } from '../models/User.js'

async function createUser (user) {
  return User.create(user)
}

async function findAllUsers () {
  return User.find({})
}

async function findById (id) {
  return User.findById({ _id: id })
}

async function updateUser (userId, body) {
  return User.findByIdAndUpdate({ _id: userId }, body)
}

async function emailExists (email) {
  return User.exists(email)
}

export default {
  createUser,
  findAllUsers,
  findById,
  updateUser,
  emailExists
}
