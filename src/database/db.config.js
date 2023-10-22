import mongoose from 'mongoose'

export function connectToMongo () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log('mongo is running'))
    .catch(err => console.log(err))
}
