import z from 'zod'
import { IUser } from '../interfaces'

const userSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  email: z
    .string({ required_error: 'User Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    required_error: 'User password is required.',
  }),
})

export function validateUser(input: IUser) {
  return userSchema.safeParse(input)
}

export function validateLoginlUser(input: IUser) {
  return userSchema.partial({ email: true }).safeParse(input)
}

export function validatePartialUser(input: IUser) {
  return userSchema.partial().safeParse(input)
}

const applicantUserSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  email: z
    .string({ required_error: 'User Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    required_error: 'User password is required.',
  }),
  name: z.string({
    required_error: 'Name is required.',
  }),
  lastName: z.string({
    required_error: 'Lastname is required.',
  }),
})

export function validateApplicantUser(input: any) {
  return applicantUserSchema.safeParse(input)
}

const companyUserSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  email: z
    .string({ required_error: 'User Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    required_error: 'User password is required.',
  }),
  businessName: z.string({
    required_error: 'businessName is required.',
  }),
  industry: z.string({
    required_error: 'Industry is required.',
  }),
})

export function validateCompanyUser(input: any) {
  return companyUserSchema.safeParse(input)
}
