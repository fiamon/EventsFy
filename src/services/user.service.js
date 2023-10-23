import bcrypt from 'bcrypt'

import {
  createUserRepository,
  emailExistsRepository,
  findAllUsersRepository,
  findByIdRepository,
  updateUserRepository
} from '../repositories/user.repository.js'

export async function createUserService (body) {
  const { username, email, password, fullName, avatar, contact } = body

  if (!username || !email || !password || !fullName || !contact || !avatar) throw new Error('Please fill in all fields to register')

  const verifyEmail = await emailExistsRepository({ email })
  if (verifyEmail) throw new Error('This email alredy exists')

  const user = await createUserRepository(body)
  if (!user) throw new Error('Error creating user')

  return { message: 'User successfully created' }
}

export async function findAllUsersService () {
  const users = await findAllUsersRepository()
  if (users.length === 0) throw new Error('There are no registered users')

  return users
}

export async function findUserByIdService (id) {
  const user = await findByIdRepository(id)
  if (!user) throw new Error('User not found')

  return user
}

export async function updateUserService (body, userId) {
  let { username, email, password, fullName, avatar, contact } = body
  if (!username && !email && !password && !fullName && !avatar && !contact) throw new Error('Please fill in at least one field to change some info')

  if (password) password = bcrypt.hashSync(password, 10)

  const user = await findByIdRepository(userId)
  if (!user) throw new Error('User not found!')

  // eslint-disable-next-line eqeqeq
  if (user._id != userId) throw new Error('You cant update this user!')

  const updatedUser = await updateUserRepository(body, userId)

  if (!updatedUser) throw new Error('An error occurred when trying to change the information. Try again later')

  return { message: 'User successfully updated' }
}
