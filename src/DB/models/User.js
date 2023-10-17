import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  fullName: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  contact: {
    type: [String],
    required: true
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  const saltRound = 10
  this.password = await bcrypt.hashSync(this.password, saltRound)
  next()
})

export const User = mongoose.model('User', userSchema)
