import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

async function findUserByEmail (email) {
  return await User
    .findOne({ email })
    .select('+password')
}

async function generateToken (id) {
  return jwt
    .sign({ _id: id },
      process.env.JWT_SECRET,
      { expiresIn: 86400 })
}

export default {
  findUserByEmail,
  generateToken
}
