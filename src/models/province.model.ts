import { Schema, model } from 'mongoose'
import { IFilter } from '../interfaces'

const provinceSchema = new Schema({
  description: String,
})

provinceSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const ProvinceModel = model<IFilter>('Province', provinceSchema)
