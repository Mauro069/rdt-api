import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicantEducation } from '../../schemas/applicant'
import { EducationModel, IEducation } from '../../models/education.model'

export async function addEducation(req: Request, res: Response): Promise<void> {
  try {
    const result = validateApplicantEducation(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const existingApplicant = await ApplicantModel.findOne({ user: id })

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    const newEducation: IEducation = new EducationModel({
      ...result.data,
      applicant: existingApplicant._id,
    })

    await newEducation.save()

    res.status(201).json({ message: messages.success.educationCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
