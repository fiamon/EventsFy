import { Router } from 'express'

import userRouter from './user.routes.js'
import eventRouter from './event.routes.js'
import loginRouter from './login.routes.js'
import swaggerRoutes from './swagger.routes.js'

const router = Router()

router.use('/events', eventRouter)
router.use('/login', loginRouter)
router.use('/doc', swaggerRoutes)
router.use('/users', userRouter)

export default router
