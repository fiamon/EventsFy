import 'dotenv/config'
import express from 'express'

import { connectToMongo } from './DB/config/db.config.js'
import userRoutes from './User/user.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRoutes)

app.listen(process.env.PORT || 8080, async () => {
  await connectToMongo()
  console.log('server is running')
})
