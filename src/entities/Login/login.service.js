import { User } from '../../db/models/User.js'
import jwt from 'jsonwebtoken'

export const findUser = async (email) => await User.findOne({ email }).select('+password')
export const generateToken = async (id) => jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: 86400 })
