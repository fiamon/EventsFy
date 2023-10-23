import {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateUserService
} from '../services/user.service.js'

export async function createUserController (req, res) {
  const body = req.body

  try {
    const user = await createUserService(body)
    return res.status(201).send(user)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function findAllUsersController (req, res) {
  try {
    const users = await findAllUsersService()
    return res.send(users)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function findByIdController (req, res) {
  const { id } = req.params

  try {
    const user = await findUserByIdService(id)
    return res.send(user)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export async function updateUserController (req, res) {
  const body = req.body
  const userId = req.userId

  try {
    const updatedUser = await updateUserService(body, userId)
    return res.send(updatedUser)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
