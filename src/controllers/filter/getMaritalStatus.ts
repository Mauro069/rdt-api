import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { MaritalStatusModel } from '../../models/maritalStatus'

export async function getMaritalStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const maritalStatus = await MaritalStatusModel.find()

    res.status(200).json({ maritalStatus: maritalStatus })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
