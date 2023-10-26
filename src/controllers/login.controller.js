import loginService from '../services/login.service.js'

async function login (req, res) {
  const { password, email } = req.body

  try {
    const token = await loginService.loginAndToken(password, email)

    res.header('Authorization', `Bearer ${token}`)
    return res.send('Logged')
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export default {
  login
}
