import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { IUser, UserModel } from '../../models/user.model'
import { validateUpdateUserStatusSchema } from '../../schemas/admin'

export async function updateUserStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateUpdateUserStatusSchema(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { username, status } = result.data

    // // Verificar existencia del usuario
    const user: IUser | null = await UserModel.findOne({ username: username })

    if (user === null) {
      res.status(401).json({ message: messages.error.invalidCredentials })
      return
    }

    // // Actualizar usuario
    user.status = status
    await user.save()

    res.status(201).json({ message: messages.success.userStatusUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
