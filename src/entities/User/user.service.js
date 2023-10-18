import { User } from '../../DB/models/User.js'

export const createUser = async (user) => await User.create(user)
export const verifyUser = async (data) => await User.exists(data)
export const findAllUsers = async () => await User.find({})
export const findById = async (id) => await User.findById({ _id: id })
