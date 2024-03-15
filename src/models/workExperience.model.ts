import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'

export interface IWorkExperience extends Document {
  applicant: Schema.Types.ObjectId
  position: string
  employmentType: Schema.Types.ObjectId
  companyName: string
  location: string
  workModality: Schema.Types.ObjectId
  industry: string
  description: string
  startDate: Date
  endDate: Date
  skills: string
}

const workExperienceSchema = new Schema({
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'Applicant',
  },
  position: String,
  employmentType: {
    type: Schema.Types.ObjectId,
    ref: 'EmploymentType',
  },
  companyName: String,
  location: String,
  workModality: {
    type: Schema.Types.ObjectId,
    ref: 'WorkModality',
  },
  industry: String,
  description: String,
  startDate: { type: Date },
  endDate: { type: Date },
  skills: String,
})

workExperienceSchema.plugin(mongoosePaginate)

workExperienceSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const WorkExperienceModel = model<IWorkExperience>(
  'WorkExperience',
  workExperienceSchema
)
