import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { JobModel } from '../../models/job.model'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOrderBy } from '../../utils/getOrderBy'

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const options = req.query

    const { searchParam, isValid } = getSearhParams(req, JobModel.schema.obj)

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
      return
    }

    //@ts-ignore
    options.sort = getOrderBy(req, JobModel.schema.obj)

    // @ts-ignore
    const jobs = await JobModel.paginate(
      {
        ...searchParam,
        //status: { $ne: jobStatus.DELETED }, // Excluir trabajos con estado DELETED
      },
      {
        ...options,
        populate: 'company',
      }
    )

    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
