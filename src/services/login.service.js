import 'dotenv/config'
import * as bcrypt from 'bcrypt'

import loginRepository from '../repositories/login.repository.js'
import userValidator from '../utils/validators/user.validator.js'

async function loginAndToken (password, email) {
  if (!password || !email) throw new Error('Please fill in all fields to login')

  const { error } = await userValidator.login({ password, email })
  if (error) throw new Error(error.message)

  const user = await loginRepository.findUserByEmail(email)
  if (!user) throw new Error('Email or passoword isnt valid! Check you credentials.')
  if (!bcrypt.compareSync(password, user.password)) throw new Error('Email or passoword isnt valid! Check you credentials.')

  const token = loginRepository.generateToken(user._id)

  return token
}

export default {
  loginAndToken
}
