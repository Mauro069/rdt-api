import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { isValidObjectId } from 'mongoose'
import { EmploymentTypeModel } from '../../models/employmentType.model'

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const updatedEmploymentType = await EmploymentTypeModel.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    )

    if (!updatedEmploymentType) {
      res.status(404).json({ message: messages.error.employmentTypeNotFound })
      return
    }

    res.status(201).json({ message: messages.success.employmentTypeUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
