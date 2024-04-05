import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { ProvinceModel } from '../../models/province.model'
import { isValidObjectId } from 'mongoose'

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const updatedProvince = await ProvinceModel.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    )

    if (!updatedProvince) {
      res.status(404).json({ message: messages.error.provinceNotFound })
      return
    }

    res.status(201).json({ message: messages.success.provinceUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
