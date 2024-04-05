import { Schema, model } from 'mongoose'
import { IFilter } from '../interfaces'

const workModalitySchema = new Schema({
  description: String,
})

workModalitySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const WorkModalityModel = model<IFilter>(
  'WorkModality',
  workModalitySchema
)
