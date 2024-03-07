import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces'

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  code: { type: String, required: true },
  status: {
    type: String,
    enum: ['UNVERIFIED', 'VERIFIED', 'SUSPENDED'],
    default: 'UNVERIFIED',
  },
  userType: {
    type: String,
    enum: ['APPLICANT', 'COMPANY', 'ADMIN'],
    default: 'APPLICANT',
  },
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export const UserModel = model<IUser>('User', userSchema)
