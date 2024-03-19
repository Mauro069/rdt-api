import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicantLanguageUpdate } from '../../schemas/applicant'
import { LanguageModel } from '../../models/language.model'
import { CompetenceModel } from '../../models/competence.model'

export async function updateLanguage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateApplicantLanguageUpdate(req.body)

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

    const params = req.params

    const { languageId } = params

    let existingLanguage = await LanguageModel.findOne({
      _id: languageId,
    })

    if (!existingLanguage) {
      res.status(404).json({ message: messages.error.languageNotFound })
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

    // Actualizo el documento existente con los nuevos valores
    Object.assign(existingLanguage, result.data)

    await existingLanguage.save()

    res.status(201).json({ message: messages.success.languageUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
