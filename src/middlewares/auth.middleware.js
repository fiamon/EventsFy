import 'dotenv/config'
import jwt from 'jsonwebtoken'

import authRepository from '../repositories/auth.repository.js'

export function authMiddleware (req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({ message: 'The token was not informed!' })

    const parts = authorization.split(' ')
    if (parts.length !== 2) return res.status(401).send({ message: 'Access denied' })

    const [bearer, token] = parts
    if (bearer !== 'Bearer') return res.status(401).send({ message: 'Access denied' })

    jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
      if (error) return res.status(400).send({ message: 'Invalid Token!' })

      const user = await authRepository.findById(decode._id)
      if (!user || !user._id) return res.status(400).send({ message: 'Invalid Token!' })

      req.userId = decode._id

      return next()
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
