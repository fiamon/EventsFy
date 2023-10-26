import { User } from '../models/User.js'

async function createUser (user) {
  return await User.create(user)
}

async function findAllUsers () {
  return await User.find({})
}

async function findById (id) {
  return User.findById({ _id: id })
}

async function updateUser (userId, body) {
  return await User.findByIdAndUpdate({ _id: userId }, body)
}

async function emailExists (email) {
  return await User.exists(email)
}

export default {
  createUser,
  findAllUsers,
  findById,
  updateUser,
  emailExists
}
