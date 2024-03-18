import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { ProvinceModel } from '../../models/province.model'

export async function getProvince(req: Request, res: Response): Promise<void> {
  try {
    const provinces = await ProvinceModel.find()

    res.status(200).json({ provinces: provinces })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
