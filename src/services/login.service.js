import 'dotenv/config'
import * as bcrypt from 'bcrypt'

import {
  findUserByEmailRepository,
  generateTokenRepository
} from '../repositories/login.repository.js'

export async function loginService (password, email) {
  if (!password || !email) throw new Error('Please fill in all fields to login')

  const user = await findUserByEmailRepository(email)
  if (!user) throw new Error('Email or passoword isnt valid! Check you credentials.')
  if (!bcrypt.compareSync(password, user.password)) throw new Error('Email or passoword isnt valid! Check you credentials.')

  const token = await generateTokenRepository(user._id)

  return token
}
