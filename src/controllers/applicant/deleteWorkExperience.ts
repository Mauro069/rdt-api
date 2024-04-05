import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { WorkExperienceModel } from '../../models/workExperience.model'

export async function deleteWorkExperience(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const idToDelete = req.params.workExperienceId

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

    const workExperienceToDelete = await WorkExperienceModel.findOne({
      _id: idToDelete,
      applicant: existingApplicant._id,
    })
    if (!workExperienceToDelete) {
      res.status(404).json({ message: messages.error.workExperienceNotFound })
      return
    }

    await workExperienceToDelete.deleteOne()

    res.status(201).json({ message: messages.success.workExperienceDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
