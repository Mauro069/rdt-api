import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { WorkModalityModel } from '../../models/workModality.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const newWorkModality = new WorkModalityModel({ description })
    await newWorkModality.save()

    res.status(201).json({ message: messages.success.workModalityCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
