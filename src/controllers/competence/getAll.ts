import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { CompetenceModel } from '../../models/competence.model'

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const competences = await CompetenceModel.find({})

    res.status(200).json({ competences })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
