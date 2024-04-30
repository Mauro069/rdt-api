import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateForgotConfirm } from '../../schemas/auth'

export async function forgotConfirm(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateForgotConfirm(req.body)

    if (!result.success) {
      // @ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { username, newPassword, confirmPassword, code } = result.data

    if (newPassword !== confirmPassword) {
      res.status(401).json({ message: messages.error.passwordCoincidence })
      return
    }

    const existingUser = await UserModel.findOne({
      username: username,
      code: code,
    })

    if (!existingUser) {
      res.status(400).json({ message: messages.error.usernameOrCodeInvalid })
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    existingUser.password = hashedPassword

    await existingUser.save()

    res.status(201).json({ message: messages.success.passwordChange })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
