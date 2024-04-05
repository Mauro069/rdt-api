import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { GenderModel } from '../../models/gender.model'

export async function getGender(req: Request, res: Response): Promise<void> {
  try {
    const genders = await GenderModel.find()

    res.status(200).json({ genders: genders })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
