import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { CompanyModel } from '../../models/company.model'
import { JobModel } from '../../models/job.model'
import { ApplicationModel } from '../../models/application.model'

export async function getApplicants(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const existingCompany = await CompanyModel.findOne({ user: id })

    if (!existingCompany) {
      res.status(404).json({ message: messages.error.companyNotFound })
      return
    }

    const params = req.params

    const { jobId } = params

    let existingJob = await JobModel.findOne({ _id: jobId })

    if (!existingJob) {
      res.status(404).json({ message: messages.error.jobNotFound })
      return
    }

    const applications = await ApplicationModel.find({
      job: jobId,
    }).populate('applicant')

    res.status(200).json({ applications: applications })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
