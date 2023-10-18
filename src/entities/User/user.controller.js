import { createUser, findAllUsers, verifyUser, findById, updateUser } from './user.service.js'

export async function createUserController (req, res) {
  try {
    const { username, email, password, fullName, avatar, contact } = req.body
    if (!username || !email || !password || !fullName || !contact) return res.status(400).send({ message: 'Please fill in all fields to register' })

    const verifyEmail = await verifyUser({ email })
    if (verifyEmail) return res.status(400).send({ message: 'This email alredy exists' })

    const user = await createUser({
      username,
      email,
      password,
      fullName,
      avatar,
      contact
    })

    res.status(201).send({
      message: 'User successfully created',
      createdUser: user
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function findAllUsersController (req, res) {
  try {
    const users = await findAllUsers()
    if (users.length === 0) return res.status(404).send({ message: 'There are no registered users' })

    res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function findByIdController (req, res) {
  try {
    const { id } = req.params

    const user = await findById(id)
    if (!user) return res.status(404).send({ message: 'User not found' })

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function editUser (req, res) {
  const { username, email, password, fullName, avatar, contact } = req.body
  const { id } = req.params

  if (!username && !email && !password && !fullName && !avatar && !contact) {
    return res.status(400).send({ message: 'Please fill in at least 1 fild to change some info' })
  }

  const updatedUser = await updateUser(id, {
    username,
    email,
    password,
    fullName,
    avatar,
    contact
  })

  if (!updatedUser) return res.status(404).send({ message: 'An error occurred when trying to change the information. Try again later' })

  res.status(200).send({ message: 'User successfully updated' })
}
