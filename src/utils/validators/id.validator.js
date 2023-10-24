import mongoose from 'mongoose'

export async function validateId (req, res, next) {
  try {
    const { id } = req.params
    if (!id) return res.status(404).send({ message: 'ID not found!' })
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'this ID isnt valid' })

    next()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}