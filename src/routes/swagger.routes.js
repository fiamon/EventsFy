import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../swagger.json' assert {type: 'json'}

const swaggerRoutes = Router()

swaggerRoutes.use('/', swaggerUi.serve)
swaggerRoutes.get('/', swaggerUi.setup(swaggerDocument))

export default swaggerRoutes
