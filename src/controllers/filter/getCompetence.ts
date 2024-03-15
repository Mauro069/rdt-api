import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { CompetenceModel } from '../../models/competence'

export async function getCompetence(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const competences = await CompetenceModel.find()

    res.status(200).json({ competences: competences })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
