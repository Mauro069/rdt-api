import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { EducationModel } from '../../models/education.model'

export async function getEducation(req: Request, res: Response): Promise<void> {
  try {
    const params = req.params

    const { educationId } = params

    let existingEducation = await EducationModel.findOne({ _id: educationId })

    if (!existingEducation) {
      res.status(404).json({ message: messages.error.educationNotFound })
      return
    }

    res.status(200).json({ existingEducation })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
