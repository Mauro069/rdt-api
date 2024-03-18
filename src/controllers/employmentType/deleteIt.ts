import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { isValidObjectId } from 'mongoose'
import { EmploymentTypeModel } from '../../models/employmentType.model'

export async function deleteIt(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const deletedEmploymentType =
      await EmploymentTypeModel.findByIdAndDelete(id)
    if (!deletedEmploymentType) {
      res.status(404).json({ message: messages.error.employmentTypeNotFound })
      return
    }

    res.status(201).json({ message: messages.success.employmentTypeDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
