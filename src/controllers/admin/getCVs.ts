import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { EducationModel } from '../../models/education.model'
import { ApplicantModel, IApplicant } from '../../models/applicant.model'
import { LanguageModel } from '../../models/language.model'
import { WorkExperienceModel } from '../../models/workExperience.model'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOptions } from '../../utils/getOptions'

export async function getCVs(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const { searchParam, isValid } = getSearhParams(
      req,
      ApplicantModel.schema.obj
    )

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
      return
    }

    //@ts-ignore
    const options = getOptions(req, ApplicantModel.schema.obj)

    const sortedOptions = {
      ...options,
      populate: ['province', 'gender', 'maritalStatus'],
    }

    // @ts-ignore
    const applicants = await ApplicantModel.paginate(
      { ...searchParam },
      sortedOptions
    )

    if (!applicants || applicants.docs.length === 0) {
      res.status(200).json([])
      return
    }

    const applicantIds = applicants.docs.map(
      (applicant: IApplicant) => applicant._id
    )

    const languages = await LanguageModel.find({
      applicant: { $in: applicantIds },
    }).populate('competence')

    const workExperiences = await WorkExperienceModel.find({
      applicant: { $in: applicantIds },
    }).populate(['employmentType', 'workModality'])

    const educations = await EducationModel.find({
      applicant: { $in: applicantIds },
    })

    const cvs = applicants.docs.map((applicant: IApplicant) => {
      const applicantLanguages = languages.filter(
        (language) => language.applicant.toString() === applicant._id.toString()
      )
      const applicantWorkExperiences = workExperiences.filter(
        (workExperience) =>
          workExperience.applicant.toString() === applicant._id.toString()
      )
      const applicantEducations = educations.filter(
        (education) =>
          education.applicant.toString() === applicant._id.toString()
      )

      return {
        applicant,
        workExperiences: applicantWorkExperiences,
        educations: applicantEducations,
        languages: applicantLanguages,
      }
    })

    // Crear una copia del objeto applicants y eliminar la propiedad docs
    const paginationData = { ...applicants, docs: undefined }

    res.status(200).json({
      ...paginationData,
      docs: cvs,
    })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
