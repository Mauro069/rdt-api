import { Schema, model } from 'mongoose'
import { IFilter } from '../interfaces'

const competenceSchema = new Schema({
  description: String,
})

competenceSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const CompetenceModel = model<IFilter>('Competence', competenceSchema)
