import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ICompany extends Document {
  user: Schema.Types.ObjectId
  image: {
    secure_url: string
    public_id: string
  }
  businessName: string
  industry: string
}

const companySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    secure_url: String,
    public_id: String,
  },
  businessName: String,
  industry: String,
})

companySchema.plugin(mongoosePaginate)

companySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const CompanyModel = model<ICompany>('Company', companySchema)
