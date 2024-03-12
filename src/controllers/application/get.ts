import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { ApplicationModel } from '../../models/application.model'

export async function get(req: Request, res: Response): Promise<void> {
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

    const applications = await ApplicationModel.find({
      applicant: existingApplicant._id,
    }).populate('job')

    res.status(200).json({ applications: applications })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
