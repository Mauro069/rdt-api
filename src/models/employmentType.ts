import { Schema, model } from 'mongoose'
import { IFilter } from '../interfaces'

const employmentTypeSchema = new Schema({
  description: String,
})

employmentTypeSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const EmploymentTypeModel = model<IFilter>(
  'EmploymentType',
  employmentTypeSchema
)
