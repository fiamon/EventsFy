import { Router } from 'express'

import { login } from './auth.controller.js'
import { } from './auth.middleware.js'

const router = Router()

router.post('/', login)

export default router
