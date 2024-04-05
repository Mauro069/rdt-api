import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'

export interface IApplicant extends Document {
  user: Schema.Types.ObjectId
  image: {
    secure_url: string
    public_id: string
  }
  name: string
  lastName: string
  phoneNumber: string
  address: string
  postalCode: string
  province: Schema.Types.ObjectId
  cityRegion: string
  gender: Schema.Types.ObjectId
  birthDate: Date
  birthPlace: string
  nationality: string
  maritalStatus: Schema.Types.ObjectId
  linkedIn: string
  webSite: string
}

const applicantSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    secure_url: String,
    public_id: String,
  },
  name: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  postalCode: String,
  province: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
  },
  cityRegion: String,
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'Gender',
  },
  birthDate: Date,
  birthPlace: String,
  nationality: String,
  maritalStatus: {
    type: Schema.Types.ObjectId,
    ref: 'MaritalStatus',
  },
  linkedIn: String,
  webSite: String,
})

applicantSchema.plugin(mongoosePaginate)

applicantSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const ApplicantModel = model<IApplicant>('Applicant', applicantSchema)
