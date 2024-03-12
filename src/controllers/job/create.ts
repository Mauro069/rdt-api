import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { validateJob } from '../../schemas/job'
import { IJob, JobModel } from '../../models/job.model'
import { CompanyModel } from '../../models/company.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const result = validateJob(req.body)

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

    const existingCompany = await CompanyModel.findOne({ user: id })

    if (!existingCompany) {
      res.status(404).json({ message: messages.error.companyNotFound })
      return
    }

    const newJob: IJob = new JobModel({
      ...result.data,
      company: existingCompany._id,
      creationDate: new Date(),
    })

    await newJob.save()

    res.status(201).json({ message: messages.success.jobCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
