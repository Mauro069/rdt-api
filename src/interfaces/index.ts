import { Document } from 'mongoose'
export interface DecodedToken {
  userId: string | number
  iat: number
  exp: number
}

export type UserType = 'APPLICANT' | 'COMPANY' | 'ADMIN'

export type UserStatus = 'UNVERIFIED' | 'VERIFIED' | 'SUSPENDED'

export type JobStatus = 'ACTIVE' | 'INACTIVE' | 'PAUSED'

export interface MessageResponse {
  message: string
}
