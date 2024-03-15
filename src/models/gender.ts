import { Schema, model } from 'mongoose'
import { IFilter } from '../interfaces'

const genderSchema = new Schema({
  description: String,
})

genderSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const GenderModel = model<IFilter>('Gender', genderSchema)
