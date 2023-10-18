import 'dotenv/config'
import express from 'express'

import { connectToMongo } from './DB/config/db.config.js'
import userRoutes from './entities/User/user.routes.js'
import eventRoutes from './entities/Event/event.routes.js'
import authRoutes from './entities/Login/login.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/event', eventRoutes)
app.use('/auth', authRoutes)
app.use('/', userRoutes)

app.listen(process.env.PORT || 8080, async () => {
  await connectToMongo()
  console.log('server is running')
})
