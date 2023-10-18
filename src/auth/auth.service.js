import { User } from '../db/models/User.js'

export const findById = async (id) => await User.findById({ _id: id })
