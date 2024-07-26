import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { CompanyModel } from '../../models/company.model'
import { JobModel } from '../../models/job.model'
import { getOptions } from '../../utils/getOptions'
import { getSearhParams } from '../../utils/getSearhParams'
import { jobStatus } from '../../utils/constants'
import { ApplicationModel } from '../../models/application.model'

export async function get(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const { searchParam, isValid } = getSearhParams(req, JobModel.schema.obj)

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
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

    //@ts-ignore
    const options = getOptions(req, JobModel.schema.obj)

    const sortedOptions = {
      ...options,
      populate: ['company', 'workModality', 'province'],
    }

    if (typeof req.query.status === 'string') {
      // @ts-ignore
      searchParam.status = req.query.status
    } else {
      // @ts-ignore
      searchParam.status = { $ne: jobStatus.DELETED } // Excluir trabajos con estado DELETED
    }

    // @ts-ignore
    const jobs = await JobModel.paginate(
      { ...searchParam, company: existingCompany._id },
      sortedOptions
    )

    const docs = await Promise.all(
      jobs.docs.map(async (job: any) => {
        const applications = await ApplicationModel.find({ job: job._id })
          .populate('applicant')
          .exec()
        return { ...job.toJSON(), applications }
      })
    )

    jobs.docs = docs

    res.status(200).json({ jobs: jobs })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
