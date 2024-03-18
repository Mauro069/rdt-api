import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { ProvinceModel } from '../../models/province'
import { isValidObjectId } from 'mongoose'

export async function deleteIt(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: messages.error.idNotValid })
      return
    }

    const deletedProvince = await ProvinceModel.findByIdAndDelete(id)
    if (!deletedProvince) {
      res.status(404).json({ message: messages.error.provinceNotFound })
      return
    }
    res.json({ message: 'Province deleted successfully' })

    res.status(201).json({ message: messages.success.provinceDeleted })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
