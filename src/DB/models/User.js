import mongoose from 'mongoose'

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
  },
  timestamp: true
})

export const User = mongoose.model('User', userSchema)
