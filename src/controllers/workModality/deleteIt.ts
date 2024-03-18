import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { isValidObjectId } from 'mongoose'
import { WorkModalityModel } from '../../models/workModality.model'

export async function deleteIt(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const deletedWorkModality = await WorkModalityModel.findByIdAndDelete(id)
    if (!deletedWorkModality) {
      res.status(404).json({ message: messages.error.workModalityNotFound })
      return
    }

    res.status(201).json({ message: messages.success.workModalityDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
