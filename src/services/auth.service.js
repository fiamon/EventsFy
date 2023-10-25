import 'dotenv/config'
import jwt from 'jsonwebtoken'

import { findByIdRepository } from '../repositories/auth.repository.js'

export async function authService (authorization) {
  if (!authorization) throw new Error('The token was not informed!')

  const parts = authorization.split(' ')
  if (parts.length !== 2) throw new Error('Access denied')

  const [bearer, token] = parts
  if (bearer !== 'Bearer') throw new Error('Access denied')

  jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
    if (error) throw new Error('Invalid Token!')

    const user = await findByIdRepository(decode._id)
    if (!user || !user._id) throw new Error('Invalid Token!')

    const userId = decode._id

    return userId
  })
}
