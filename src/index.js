import 'dotenv/config'
import express from 'express'

import { connectToMongo } from './DB/config/db.config.js'

const app = express()

app.listen(process.env.PORT || 8080, async () => {
  await connectToMongo()
  console.log('server is running')
})
