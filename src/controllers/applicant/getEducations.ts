import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { EducationModel } from '../../models/education.model'
import { ApplicantModel } from '../../models/applicant.model'

export async function getEducations(
  req: Request,
  res: Response
): Promise<void> {
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

    const educations = await EducationModel.find({
      applicant: existingApplicant._id,
    })

    res.status(200).json({ educations })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
