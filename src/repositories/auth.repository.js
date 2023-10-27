import { User } from '../models/User.js'

function findById (id) {
  return User.findById({ _id: id })
}

export default {
  findById
}
