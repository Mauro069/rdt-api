import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'
import { ApplicationStatus } from '../interfaces'

export interface IApplication extends Document {
  job: Schema.Types.ObjectId
  applicant: Schema.Types.ObjectId
  reason: string
  status: ApplicationStatus
  creationDate: Date
}

const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'Applicant',
  },
  reason: String,
  status: {
    type: String,
    enum: ['PENDING', 'SEEN', 'REJECTED', 'CHOSEN'],
    default: 'PENDING',
  },
  creationDate: { type: Date, required: true },
})

applicationSchema.plugin(mongoosePaginate)

applicationSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const ApplicationModel = model<IApplication>(
  'Application',
  applicationSchema
)
