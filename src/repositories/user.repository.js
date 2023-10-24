import { User } from '../models/User.js'

export async function createUserRepository (user) {
  return await User.create(user)
}

export async function findAllUsersRepository () {
  return await User.find({})
}

export async function findByIdRepository (id) {
  return User.findById({ _id: id })
}

export async function updateUserRepository (userId, body) {
  return await User.findByIdAndUpdate({ _id: userId }, body)
}

export async function emailExistsRepository (email) {
  return await User.exists(email)
}
