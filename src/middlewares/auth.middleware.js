import authService from '../services/auth.service.js'

export async function authMiddleware (req, res, next) {
  const { authorization } = req.headers

  try {
    const userId = await authService.auth(authorization)
    req.userId = userId
    return next()
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
