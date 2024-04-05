import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { WorkExperienceModel } from '../../models/workExperience.model'

export async function getWorkExperience(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const params = req.params

    const { workExperienceId } = params

    let existingWorkExperience = await WorkExperienceModel.findOne({
      _id: workExperienceId,
    }).populate(['employmentType', 'workModality'])

    if (!existingWorkExperience) {
      res.status(404).json({ message: messages.error.workExperienceNotFound })
      return
    }

    res.status(200).json({ existingWorkExperience })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
