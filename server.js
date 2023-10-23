import 'dotenv/config'

import { connectToMongo } from './src/database/db.config.js'
import app from './src/app.js'

app.listen(process.env.PORT || 8080, () => {
  connectToMongo()
  console.log('server is running')
})
