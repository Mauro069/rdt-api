import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { ProvinceModel } from '../../models/province'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const newProvince = new ProvinceModel({ description })
    await newProvince.save()

    res.status(201).json({ message: messages.success.provinceCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
