import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startsAt: {
    type: Date,
    required: true
  },
  endsAt: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  susbscribedPeople: {
    type: Array,
    required: true
  },
  spaceImage: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: true
  }
}, { timestamps: true })

export const Event = mongoose.model('Event', eventSchema)
