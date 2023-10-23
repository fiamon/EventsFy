import { User } from '../models/User.js'

export async function createUserRepository (user) {
  return await User.create(user)
}
export async function emailExistsRepository (email) {
  return await User.exists(email)
}

export async function findAllUsersRepository () {
  return await User.find({})
}

export async function findByIdRepository (id) {
  return User.findById({ _id: id })
}

export async function updateUserRepository (body, id) {
  return await User.findByIdAndUpdate(id, { body })
}
