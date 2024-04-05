import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { isValidObjectId } from 'mongoose'
import { GenderModel } from '../../models/gender.model'

export async function deleteIt(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const deletedGender = await GenderModel.findByIdAndDelete(id)
    if (!deletedGender) {
      res.status(404).json({ message: messages.error.genderNotFound })
      return
    }

    res.status(201).json({ message: messages.success.genderDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
