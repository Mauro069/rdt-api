import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOptions } from '../../utils/getOptions'
import { JobModel } from '../../models/job.model'
import { ApplicationModel } from '../../models/application.model'

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

    const docs = await Promise.all(
      jobs.docs.map(async (job: any) => {
        const applications = await ApplicationModel.find({ job: job._id }).exec();
        return {
          ...job.toJSON(),
          hasApplications: applications.length > 0,
        };
      })
    );

    jobs.docs = docs

    res.status(200).json({
      jobs,
    })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
