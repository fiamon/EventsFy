import { User } from '../models/User.js'

function createUser (user) {
  return User.create(user)
}

function findAllUsers () {
  return User.find({})
}

function findById (id) {
  return User.findById({ _id: id })
}

function updateUser (userId, body) {
  return User.findByIdAndUpdate({ _id: userId }, body)
}

function emailExists (email) {
  return User.exists(email)
}

export default {
  createUser,
  findAllUsers,
  findById,
  updateUser,
  emailExists
}
