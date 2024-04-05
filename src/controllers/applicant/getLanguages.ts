import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { LanguageModel } from '../../models/language.model'

export async function getLanguages(req: Request, res: Response): Promise<void> {
  try {
    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const existingApplicant = await ApplicantModel.findOne({ user: id })

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    const languages = await LanguageModel.find({
      applicant: existingApplicant._id,
    }).populate('competence')

    res.status(200).json({ languages })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
