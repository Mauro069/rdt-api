import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateUser } from '../../schemas/users'
import { IUser } from '../../interfaces'

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const result = validateUser(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { username, email, password } = result.data

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    })

    if (existingUser) {
      res.status(400).json({ message: messages.error.existingUser })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: IUser = new UserModel({
      ...result.data,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({ message: messages.success.registration })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
