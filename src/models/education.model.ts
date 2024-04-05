import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'

export interface IEducation extends Document {
  applicant: Schema.Types.ObjectId
  institution: string
  degree: string
  startDate: Date
  endDate: Date
  description: string
}

const educationSchema = new Schema({
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'Applicant',
  },
  institution: String,
  degree: String,
  startDate: { type: Date },
  endDate: { type: Date },
  description: String,
})

educationSchema.plugin(mongoosePaginate)

educationSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const EducationModel = model<IEducation>('Education', educationSchema)
