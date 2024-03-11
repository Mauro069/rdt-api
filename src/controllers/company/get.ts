import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { CompanyModel } from '../../models/company.model'

export async function get(req: Request, res: Response): Promise<void> {
  try {
    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const existingCompany = await CompanyModel.findOne({ user: id }).populate(
      'user'
    )

    res.status(200).json({ company: existingCompany })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
