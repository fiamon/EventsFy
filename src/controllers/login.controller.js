import {
  loginService
} from '../services/login.service.js'

export async function loginController (req, res) {
  const { password, email } = req.body

  try {
    const token = await loginService(password, email)

    res.header('Authorization', `Bearer ${token}`)
    return res.send('Logged')
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
