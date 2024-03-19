import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicantEducationUpdate } from '../../schemas/applicant'
import { EducationModel } from '../../models/education.model'

export async function updateEducation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateApplicantEducationUpdate(req.body)

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

    const params = req.params

    const { educationId } = params

    let existingEducation = await EducationModel.findOne({ _id: educationId })

    if (!existingEducation) {
      res.status(404).json({ message: messages.error.educationNotFound })
      return
    }

    // Actualizo el documento existente con los nuevos valores
    Object.assign(existingEducation, result.data)

    await existingEducation.save()

    res.status(201).json({ message: messages.success.educationUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
