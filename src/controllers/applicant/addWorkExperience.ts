import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicantWorkExperience } from '../../schemas/applicant'
import {
  IWorkExperience,
  WorkExperienceModel,
} from '../../models/workExperience.model'
import { EmploymentTypeModel } from '../../models/employmentType.model'
import { WorkModalityModel } from '../../models/workModality.model'

export async function addWorkExperience(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateApplicantWorkExperience(req.body)

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

    const newWorkExperience: IWorkExperience = new WorkExperienceModel({
      ...result.data,
      applicant: existingApplicant._id,
    })

    await newWorkExperience.save()

    res.status(201).json({ message: messages.success.workExperienceCreated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
