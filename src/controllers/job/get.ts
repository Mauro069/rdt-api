import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { CompanyModel } from '../../models/company.model'
import { JobModel } from '../../models/job.model'
import { getOrderBy } from '../../utils/getOrderBy'

export async function get(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const options = req.query

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

    //@ts-ignore
    options.sort = getOrderBy(req, JobModel.schema.obj)

    // @ts-ignore
    const jobs = await JobModel.paginate(
      {
        company: existingCompany._id,
      },
      {
        ...options,
        populate: 'company',
      }
    )

    res.status(200).json({ jobs: jobs })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
