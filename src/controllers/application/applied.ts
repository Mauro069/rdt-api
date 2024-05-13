import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicationModel } from '../../models/application.model'
import { ApplicantModel } from '../../models/applicant.model'

export async function applied(req: Request, res: Response): Promise<void> {
  try {
    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const params = req.params

    const { applicationId } = params

    const existingApplicant = await ApplicantModel.findOne({ user: id })

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    const applications = await ApplicationModel.find({
      _id: applicationId,
      applicant: existingApplicant._id,
    })

    res.status(201).json({ applied: applications.length > 0 ? true : false })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
