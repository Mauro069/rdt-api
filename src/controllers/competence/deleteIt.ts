import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { isValidObjectId } from 'mongoose'
import { CompetenceModel } from '../../models/competence.model'

export async function deleteIt(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const deleteCompetence = await CompetenceModel.findByIdAndDelete(id)
    if (!deleteCompetence) {
      res.status(404).json({ message: messages.error.workExperienceNotFound })
      return
    }

    res.status(201).json({ message: messages.success.competenceDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
