import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { IUser, UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateChangePassword } from '../../schemas/auth'
import { getUserId } from '../../utils/getUserId'

export async function changePassword(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateChangePassword(req.body)

    if (!result.success) {
      // @ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { oldPassword, newPassword, repeatPassword } = result.data

    if (newPassword !== repeatPassword) {
      res.status(401).json({ message: messages.error.passwordCoincidence })
      return
    }

    if (oldPassword === newPassword) {
      res.status(401).json({ message: messages.error.passwordNotValid })
      return
    }

    const { id, error, message } = getUserId(req)
    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const user: IUser | null = await UserModel.findOne({ _id: id })

    if (!user) {
      res.status(401).json({ message: messages.error.invalidCredentials })
      return
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordValid) {
      res.status(401).json({ message: messages.error.invalidCredentials })
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword

    await user.save()

    res.status(201).json({ message: messages.success.passwordChange })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
