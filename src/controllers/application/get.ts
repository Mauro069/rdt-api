import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { ApplicationModel } from '../../models/application.model'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOptions } from '../../utils/getOptions'

export async function get(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const { searchParam, isValid } = getSearhParams(
      req,
      ApplicationModel.schema.obj
    )

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
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

    //@ts-ignore
    const options = getOptions(req, ApplicationModel.schema.obj)

    const sortedOptions = {
      ...options,
      populate: 'job',
    }

    // @ts-ignore
    const applications = await ApplicationModel.paginate(
      { ...searchParam, applicant: existingApplicant._id },
      sortedOptions
    )

    res.status(200).json({ applications: applications })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
