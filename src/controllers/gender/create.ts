import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { GenderModel } from '../../models/gender.model'

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { description } = req.body
    const newGender = new GenderModel({ description })
    await newGender.save()

    res.status(201).json({ message: messages.success.genderCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
