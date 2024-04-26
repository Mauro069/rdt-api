import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getSearhParams } from '../../utils/getSearhParams'
import { ApplicationModel } from '../../models/application.model'
import { getOptions } from '../../utils/getOptions'

export async function getAll(req: Request, res: Response): Promise<void> {
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

    const options = getOptions(req, ApplicationModel.schema.obj)

    const sortedOptions = {
      ...options,
      populate: 'job',
    }

    if (typeof req.query.status === 'string') {
      // @ts-ignore
      searchParam.status = req.query.status
    }

    // @ts-ignore
    const applications = await ApplicationModel.paginate(
      searchParam,
      sortedOptions
    )

    res.status(200).json({ applications })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
