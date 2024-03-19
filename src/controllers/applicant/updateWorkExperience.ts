import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicantWorkExperienceUpdate } from '../../schemas/applicant'
import { WorkExperienceModel } from '../../models/workExperience.model'
import { WorkModalityModel } from '../../models/workModality.model'
import { EmploymentTypeModel } from '../../models/employmentType.model'

export async function updateWorkExperience(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateApplicantWorkExperienceUpdate(req.body)

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

    const { workExperienceId } = params

    let existingWorkExperience = await WorkExperienceModel.findOne({
      _id: workExperienceId,
    })

    if (!existingWorkExperience) {
      res.status(404).json({ message: messages.error.workExperienceNotFound })
      return
    }

    if (result.data.employmentType) {
      const employmentType = EmploymentTypeModel.findOne({
        _id: result.data.employmentType,
      })
      if (!employmentType) {
        res.status(404).json({ message: messages.error.employmentTypeNotFound })
        return
      }
    }

    if (result.data.workModality) {
      const workModality = WorkModalityModel.findOne({
        _id: result.data.workModality,
      })
      if (!workModality) {
        res.status(404).json({ message: messages.error.workModalityNotFound })
        return
      }
    }

    // Actualizo el documento existente con los nuevos valores
    Object.assign(existingWorkExperience, result.data)

    await existingWorkExperience.save()

    res.status(201).json({ message: messages.success.workExperienceUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
