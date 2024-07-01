import { env } from '../config'
import mailService from '../lib/nodemailer'
import { JobModel } from '../models/job.model'
import { jobStatus } from '../utils/constants'
import { messages } from '../utils/messages'

export default async () => {
  console.log('---------------------')
  
  const jobsByCompany = await JobModel.aggregate([
    {
      $match: {
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
            duration: '$duration',
            updateDate: '$updateDate'
          },
        },
      },
    },
  ])

  console.log('Desactivando avisos con vigencia vencida')

  jobsByCompany.forEach((companyData) => {

    const filteredJobs = companyData.jobs.filter((job:any)  => {
      const updateDate = new Date(job.updateDate);
      const durationDate = new Date();
      durationDate.setDate(durationDate.getDate() - job.duration);
      return updateDate < durationDate;
    });

    if(filteredJobs.length > 0){
      const template = mailService.getInactiveJobTemplate(
        companyData.company,
        filteredJobs
      )
      mailService.send(
        messages.mail.inactiveJobSubjet,
        template,
        //@ts-ignore
        companyData.userEmail
      )
      filteredJobs.forEach(async (job: any) => {
        await JobModel.updateOne({ _id: job.id }, { status: jobStatus.INACTIVE })
      })
    }

  })
}
