import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { UserModel } from '../../models/user.model'

export async function getAll(_req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find({}, '-password -__v')

    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
