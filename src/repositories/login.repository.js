import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function findUserByEmailRepository (email) {
  return await User
    .findOne({ email })
    .select('+password')
}

export async function generateTokenRepository (id) {
  return jwt
    .sign({ _id: id },
      process.env.JWT_SECRET,
      { expiresIn: 86400 })
}
