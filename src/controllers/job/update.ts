import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { validateJob } from '../../schemas/job'
import { JobModel } from '../../models/job.model'
import { CompanyModel } from '../../models/company.model'

export async function update(req: Request, res: Response): Promise<void> {
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

    const params = req.params

    const { jobId } = params

    let existingJob = await JobModel.findOne({ _id: jobId })

    if (!existingJob) {
      res.status(404).json({ message: messages.error.jobNotFound })
      return
    }

    // Actualizo el documento existente con los nuevos valores
    Object.assign(existingJob, result.data)

    await existingJob.save()

    res.status(201).json({ message: messages.success.jobUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
