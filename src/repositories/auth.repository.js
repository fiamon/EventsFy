import { User } from '../models/User.js'

async function findById (id) {
  return User.findById({ _id: id })
}

export default {
  findById
}
