import { Router } from 'express'

import { login } from './login.controller.js'

const router = Router()

router.post('/', login)

export default router
