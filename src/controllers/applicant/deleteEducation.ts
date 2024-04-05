import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { messages } from '../../utils/messages'
import { EducationModel } from '../../models/education.model'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'

export async function deleteEducation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const idToDelete = req.params.educationId

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

    const educationToDelete = await EducationModel.findOne({
      _id: idToDelete,
      applicant: existingApplicant._id,
    })
    if (!educationToDelete) {
      res.status(404).json({ message: messages.error.educationNotFound })
      return
    }

    await educationToDelete.deleteOne()

    res.status(201).json({ message: messages.success.educationDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
