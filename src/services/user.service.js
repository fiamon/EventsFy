import bcrypt from 'bcrypt'

import userRepository from '../repositories/user.repository.js'
import userValidator from '../utils/validators/user.validator.js'

async function createUser (body) {
  const { username, email, password, fullName, avatar, contact } = body
  if (!username || !email || !password || !fullName || !contact || !avatar) throw new Error('Please fill in all fields to register')

  const { error } = await userValidator.createUser(body)
  if (error) throw new Error(error.message)

  const verifyEmail = await userRepository.emailExists({ email })
  if (verifyEmail) throw new Error('This email alredy exists')

  const user = await userRepository.createUser(body)
  if (!user) throw new Error('Error creating user')

  return { message: 'User successfully created' }
}

async function findAllUsers () {
  const users = await userRepository.findAllUsers()
  if (users.length === 0) throw new Error('There are no registered users')

  return users
}

async function findUserById (id) {
  const user = await userRepository.findById(id)
  if (!user) throw new Error('User not found')

  return user
}

async function updateUser (userId, body) {
  let { username, email, password, fullName, avatar, contact } = body
  if (!username && !email && !password && !fullName && !contact) throw new Error('Please fill in at least one field to change some info')

  const { error } = await userValidator.updateUser(body)
  if (error) throw new Error(error.message)

  const user = await userRepository.findById(userId)
  if (!user) throw new Error('User not found!')

  // eslint-disable-next-line eqeqeq
  if (user._id != userId) throw new Error('You cant update this user!')

  if (password) {
    password = bcrypt.hashSync(password, 10)
  }

  const updatedUser = await userRepository.updateUser(userId, {
    username,
    email,
    password,
    fullName,
    avatar,
    contact
  })

  if (!updatedUser) throw new Error('An error occurred when trying to change the information. Try again later')

  return { message: 'User successfully updated' }
}

export default {
  createUser,
  findAllUsers,
  findUserById,
  updateUser
}
