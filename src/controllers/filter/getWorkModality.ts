import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { WorkModalityModel } from '../../models/workModality.model'

export async function getWorkModality(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const workModalities = await WorkModalityModel.find()

    res.status(200).json({ workModalities: workModalities })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
