import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicantLanguage } from '../../schemas/applicant'
import { CompetenceModel } from '../../models/competence.model'
import { ILanguage, LanguageModel } from '../../models/language.model'

export async function addLanguage(req: Request, res: Response): Promise<void> {
  try {
    const result = validateApplicantLanguage(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

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

    if (result.data.competence) {
      const competence = CompetenceModel.findOne({
        _id: result.data.competence,
      })
      if (!competence) {
        res.status(404).json({ message: messages.error.competenceNotFound })
        return
      }
    }

    const newLanguage: ILanguage = new LanguageModel({
      ...result.data,
      applicant: existingApplicant._id,
    })

    await newLanguage.save()

    res.status(201).json({ message: messages.success.languageCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
