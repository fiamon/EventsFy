import { User } from '../models/User.js'

export const findById = async (id) => await User.findById({ _id: id })
