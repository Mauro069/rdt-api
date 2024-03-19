import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { WorkExperienceModel } from '../../models/workExperience.model'

export async function getWorkExperiences(
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

    const workExperiences = await WorkExperienceModel.find({
      applicant: existingApplicant._id,
    }).populate(['employmentType', 'workModality'])

    res.status(200).json({ workExperiences })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
