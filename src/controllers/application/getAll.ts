import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOrderBy } from '../../utils/getOrderBy'
import { ApplicationModel } from '../../models/application.model'

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const options = req.query

    const { searchParam, isValid } = getSearhParams(
      req,
      ApplicationModel.schema.obj
    )

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
      return
    }

    //@ts-ignore
    options.sort = getOrderBy(req, ApplicationModel.schema.obj)

    // @ts-ignore
    const applications = await ApplicationModel.paginate(searchParam, {
      ...options,
      populate: 'job',
    })

    res.status(200).json({ applications })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
