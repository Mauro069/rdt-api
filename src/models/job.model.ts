import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'
import { JobStatus } from '../interfaces'

export interface IJob extends Document {
  company: Schema.Types.ObjectId
  title: string
  description: string
  duration: Number
  creationDate: Date
  updateDate: Date
  status: JobStatus
  province: Schema.Types.ObjectId
  cityRegion: string
  workModality: Schema.Types.ObjectId
}

const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  title: String,
  description: String,
  duration: Number,
  creationDate: { type: Date, required: true },
  updateDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'PAUSED', 'DELETED'],
    default: 'ACTIVE',
  },
  province: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
  },
  cityRegion: String,
  workModality: {
    type: Schema.Types.ObjectId,
    ref: 'WorkModality',
  },
})

jobSchema.plugin(mongoosePaginate)

jobSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const JobModel = model<IJob>('Job', jobSchema)
