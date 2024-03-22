import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { validateUpdateApplication } from '../../schemas/application'
import { ApplicationModel } from '../../models/application.model'
import { CompanyModel } from '../../models/company.model'
import mailService from '../../lib/nodemailer'
import { UserModel } from '../../models/user.model'

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const result = validateUpdateApplication(req.body)

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

    const params = req.params

    const { applicationId } = params

    let existingApplication = await ApplicationModel.findOne({
      _id: applicationId,
    }).populate(['job', 'applicant'])

    if (!existingApplication) {
      res.status(404).json({ message: messages.error.applicationNotFound })
      return
    }

    //@ts-ignore
    const companyId = existingApplication.job.company
    const existingCompany = await CompanyModel.findOne({
      _id: companyId,
      user: id,
    })

    if (!existingCompany) {
      res.status(404).json({ message: messages.error.jobNotFoundInCompany })
      return
    }

    const existingApplicantUser = await UserModel.findOne({
      //@ts-ignore
      _id: existingApplication.applicant.user,
    })

    if (!existingApplicantUser) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    // Actualizo el documento existente con los nuevos valores
    Object.assign(existingApplication, result.data)

    await existingApplication.save()

    const template = mailService.getUpdateApplicationTemplate(
      existingCompany.businessName,
      //@ts-ignore
      existingApplication.job.title
    )
    mailService.send(
      messages.mail.updateApplicationSubjet,
      template,
      existingApplicantUser.email
    )

    res.status(201).json({ message: messages.success.applicationUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
