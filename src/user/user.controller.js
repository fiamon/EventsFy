import { createUser, findAllUsers, verifyUser } from './user.service.js'

export async function createUserController (req, res) {
  try {
    const body = req.body
    if (!body) return res.status(400).send({ message: 'Please fill in all fields to register' })

    const { email } = req.body

    const verifyEmail = await verifyUser({ email })
    if (verifyEmail) return res.status(400).send({ message: 'This email alredy exists' })

    const user = await createUser(body)
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
