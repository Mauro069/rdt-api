import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { UserModel } from '../../models/user.model'
import { getUserId } from '../../utils/getUserId'

export async function getDetail(req: Request, res: Response): Promise<void> {
  try {
    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }
    const existingUser = await UserModel.findOne({ _id: id }, '-password -__v')

    if (!existingUser) {
      res.status(400).json({ message: messages.error.notFound })
      return
    }

    res.status(200).json({ existingUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: messages.error.generic })
  }
}
