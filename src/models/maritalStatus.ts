import { Schema, model } from 'mongoose'
import { IFilter } from '../interfaces'

const maritalStatusSchema = new Schema({
  description: String,
})

maritalStatusSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const MaritalStatusModel = model<IFilter>(
  'MaritalStatus',
  maritalStatusSchema
)
