import { Document } from 'mongoose'
export interface DecodedToken {
  userId: string | number
  iat: number
  exp: number
}

export type UserType = 'APPLICANT' | 'COMPANY' | 'ADMIN'

export type UserStatus = 'PENDING' | 'VALIDATED' | 'SUSPENDED'

export interface MessageResponse {
  message: string
}

export interface IUser extends Document {
  id: any
  username: string
  email: string
  password: string
  status: UserStatus
  userType: UserType
}