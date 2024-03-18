import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { GenderModel } from '../../models/gender.model'

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const gender = await GenderModel.find({})

    res.status(200).json({ gender })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
