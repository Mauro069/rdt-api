import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { EmploymentTypeModel } from '../../models/employmentType.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const newEmploymentType = new EmploymentTypeModel({ description })
    await newEmploymentType.save()

    res.status(201).json({ message: messages.success.employmentTypeCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
