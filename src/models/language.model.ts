import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ILanguage extends Document {
  applicant: Schema.Types.ObjectId
  language: string
  competence: Schema.Types.ObjectId
}

const languageSchema = new Schema({
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'Applicant',
  },
  language: String,
  competence: {
    type: Schema.Types.ObjectId,
    ref: 'Competence',
  },
})

languageSchema.plugin(mongoosePaginate)

languageSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const LanguageModel = model<ILanguage>('Language', languageSchema)
