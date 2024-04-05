import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { MaritalStatusModel } from '../../models/maritalStatus.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const newMaritalStatus = new MaritalStatusModel({ description })
    await newMaritalStatus.save()

    res.status(201).json({ message: messages.success.maritalStatusCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
