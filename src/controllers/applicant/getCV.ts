import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { EducationModel } from '../../models/education.model'
import { ApplicantModel } from '../../models/applicant.model'
import { LanguageModel } from '../../models/language.model'
import { WorkExperienceModel } from '../../models/workExperience.model'

export async function getCV(req: Request, res: Response): Promise<void> {
  try {
    const params = req.params

    const { applicantId } = params

    const existingApplicant = await ApplicantModel.findOne({
      _id: applicantId,
    }).populate(['province', 'gender', 'maritalStatus'])

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    const languages = await LanguageModel.find({
      applicant: applicantId,
    }).populate('competence')

    const workExperiences = await WorkExperienceModel.find({
      applicant: applicantId,
    }).populate(['employmentType', 'workModality'])

    const educations = await EducationModel.find({ applicant: applicantId })

    const cv = {
      applicant: existingApplicant,
      workExperiences,
      educations,
      languages,
    }
    res.status(200).json({ cv })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
