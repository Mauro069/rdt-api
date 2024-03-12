import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { JobModel } from '../../models/job.model'
import { validateCreateApplication } from '../../schemas/application'
import { ApplicantModel } from '../../models/applicant.model'
import { ApplicationModel, IApplication } from '../../models/application.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const result = validateCreateApplication(req.body)

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

    const { job } = result.data

    const existingJob = await JobModel.findOne({ _id: job })
    if (!existingJob) {
      res.status(404).json({ message: messages.error.jobNotFound })
      return
    }

    const newApplication: IApplication = new ApplicationModel({
      ...result.data,
      job: existingJob._id,
      applicant: existingApplicant._id,
      creationDate: new Date(),
    })

    await newApplication.save()

    res.status(201).json({ message: messages.success.applicationCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
