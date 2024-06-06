import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { JobModel } from '../../models/job.model'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOptions } from '../../utils/getOptions'

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10 por defecto

    const { searchParam, isValid } = getSearhParams(req, JobModel.schema.obj)

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
      return
    }

    const options = getOptions(req, JobModel.schema.obj)

    const sortedOptions = {
      ...options,
      populate: ['company', 'workModality', 'province'],
    }

    if (typeof req.query.status === 'string') {
      // @ts-ignore
      searchParam.status = req.query.status
    }

    // @ts-ignore
    const jobs = await JobModel.paginate(searchParam, sortedOptions)

    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
