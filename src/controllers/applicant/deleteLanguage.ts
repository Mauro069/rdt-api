import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { LanguageModel } from '../../models/language.model'

export async function deleteLanguage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const idToDelete = req.params.languageId

    if (!isValidObjectId(idToDelete)) {
      res.status(400).json({ message: messages.error.idNotValid })
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

    const languageToDelete = await LanguageModel.findOne({
      _id: idToDelete,
      applicant: existingApplicant._id,
    })
    if (!languageToDelete) {
      res.status(404).json({ message: messages.error.languageNotFound })
      return
    }

    await languageToDelete.deleteOne()

    res.status(201).json({ message: messages.success.languageDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
