import { User } from '../models/User.js'

export async function findByIdRepository (id) {
  return await User.findById({ _id: id })
}
