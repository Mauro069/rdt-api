import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { CompetenceModel } from '../../models/competence.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const newCompetence = new CompetenceModel({ description })
    await newCompetence.save()

    res.status(201).json({ message: messages.success.competenceCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
