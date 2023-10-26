import { User } from '../models/User.js'

async function findById (id) {
  return await User.findById({ _id: id })
}

export default {
  findById
}
