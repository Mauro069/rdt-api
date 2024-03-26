import { env } from '../config'
import mailService from '../lib/nodemailer'
import { JobModel } from '../models/job.model'
import { jobStatus } from '../utils/constants'
import { messages } from '../utils/messages'

export default async () => {
  console.log('---------------------')
  console.log(
    'Borrando avisos con vigencia > a dias = ',
    env.SCHEDULE_INACTIVE_DURATION
  )

  const inactiveDate = new Date()
  inactiveDate.setDate(inactiveDate.getDate() - env.SCHEDULE_INACTIVE_DURATION)

  const jobsByCompany = await JobModel.aggregate([
    {
      $match: {
        updateDate: { $lt: inactiveDate },
        status: jobStatus.ACTIVE,
      },
    },
    {
      $lookup: {
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        as: 'company',
      },
    },
    {
      $unwind: '$company',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'company.user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $group: {
        _id: '$company._id',
        company: {
          $first: {
            businessName: '$company.businessName',
            description: '$company.description',
          },
        },
        userEmail: { $first: '$user.email' },
        jobs: {
          $push: {
            id: '$_id',
            title: '$title',
            description: '$description',
          },
        },
      },
    },
  ])

  jobsByCompany.forEach((companyData) => {
    const template = mailService.getInactiveJobTemplate(
      companyData.company,
      companyData.jobs
    )
    mailService.send(
      messages.mail.inactiveJobSubjet,
      template,
      //@ts-ignore
      companyData.userEmail
    )
    companyData.jobs.forEach(async (job: any) => {
      await JobModel.updateOne({ _id: job.id }, { status: jobStatus.INACTIVE })
    })
  })
}
