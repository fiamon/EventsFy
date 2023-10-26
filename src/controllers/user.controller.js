import userService from '../services/user.service.js'

async function createUser (req, res) {
  const body = req.body

  try {
    const user = await userService.createUser(body)
    return res.status(201).send(user)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function findAllUsers (req, res) {
  try {
    const users = await userService.findAllUsers()
    return res.send(users)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function findById (req, res) {
  const { id } = req.params

  try {
    const user = await userService.findUserById(id)
    return res.send(user)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

async function updateUser (req, res) {
  const body = req.body
  const userId = req.userId

  try {
    const updatedUser = await userService.updateUser(userId, body)
    return res.send(updatedUser)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export default {
  createUser,
  findAllUsers,
  findById,
  updateUser
}
