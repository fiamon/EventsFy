import 'dotenv/config'
import express from 'express'

import { connectToMongo } from './database/db.config.js'

import userRoutes from './routes/user.routes.js'
import eventRoutes from './routes/event.routes.js'
import loginRoutes from './routes/login.routes.js'
import swaggerRoutes from './routes/swagger.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/event', eventRoutes)
app.use('/login', loginRoutes)
app.use('/doc', swaggerRoutes)
app.use('/', userRoutes)

app.listen(process.env.PORT || 8080, () => {
  connectToMongo()
  console.log('server is running')
})
