import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicationModel } from '../../models/application.model'
import { ApplicantModel } from '../../models/applicant.model'
import { JobModel } from '../../models/job.model'

export async function applied(req: Request, res: Response): Promise<void> {
  try {
    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const params = req.params

    const { jobId } = params

    const existingJob = await JobModel.findOne({ _id: jobId })

    if (!existingJob) {
      res.status(404).json({ message: messages.error.jobNotFound })
      return
    }

    const existingApplicant = await ApplicantModel.findOne({
      user: id,
    })

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    const application = await ApplicationModel.findOne({
      job: jobId,
      applicant: existingApplicant._id,
    })

    res.status(201).json({ applied: application ? true : false })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
