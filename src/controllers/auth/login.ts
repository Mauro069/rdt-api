import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { env } from '../../config'

import { IUser } from '../../interfaces'
import { validateLoginlUser } from '../../schemas/users'

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const result = validateLoginlUser(req.body)

    if (!result.success) {
      // @ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { username, password } = result.data

    const user: IUser | null = await UserModel.findOne({ username: username })

    if (!user) {
      res.status(401).json({ message: messages.error.invalidCredentials })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(401).json({ message: messages.error.invalidCredentials })
      return
    }

    const token = jwt.sign({ userId: user.id, role: user.userType }, env.SECRET!, {
      expiresIn: '1h',
    })

    res.status(200).json({ message: messages.success.login, token })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
