import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { messages } from '../../utils/messages'
import { JobModel } from '../../models/job.model'

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const params = req.params

    const { jobId } = params

    if (!jobId) {
      res.status(400).json({ message: messages.error.idNotFound })
      return
    }

    if (!isValidObjectId(jobId)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const job = await JobModel.findOne({ _id: jobId }).populate('company')

    res.status(200).json({ job })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
