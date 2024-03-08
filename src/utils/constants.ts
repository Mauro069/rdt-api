import { UserStatus, UserType } from '../interfaces'

export const userStatus: { [key: string]: UserStatus } = {
  UNVERIFIED: 'UNVERIFIED',
  VERIFIED: 'VERIFIED',
  SUSPENDED: 'SUSPENDED',
}

export const userType: { [key: string]: UserType } = {
  APPLICANT: 'APPLICANT',
  COMPANY: 'COMPANY',
  ADMIN: 'ADMIN',
}
