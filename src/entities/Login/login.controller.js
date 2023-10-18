import 'dotenv/config'
import * as bcrypt from 'bcrypt'

import { findUser, generateToken } from './login.service.js'

export async function login (req, res) {
  try {
    const { password, email } = req.body
    if (!password || !email) return res.status(400).send({ message: 'Please fill in all fields to login' })

    const user = await findUser(email)
    if (!user) return res.status(404).send({ message: 'Email or passoword isnt valid! Check you credentials.' })
    if (!bcrypt.compareSync(password, user.password)) return res.status(404).send({ message: 'Email or passoword isnt valid! Check you credentials.' })

    const token = await generateToken(user._id)

    res.header('Authorization', `Bearer ${token}`)
    res.status(200).send('Logged')
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
