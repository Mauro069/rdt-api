import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOptions } from '../../utils/getOptions'
import { JobModel } from '../../models/job.model'

export async function getJobs(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const { searchParam, isValid } = getSearhParams(req, JobModel.schema.obj)

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
      return
    }

    //@ts-ignore
    const options = getOptions(req, JobModel.schema.obj)

    const sortedOptions = {
      ...options,
      populate: 'company',
    }

    // @ts-ignore
    const jobs = await JobModel.paginate({ ...searchParam }, sortedOptions)

    res.status(200).json({
      jobs,
    })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
