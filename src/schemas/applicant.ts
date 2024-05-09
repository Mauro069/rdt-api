import z from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../config'

const applicantSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
  }),
  lastName: z.string({
    required_error: 'Lastname is required.',
  }),
  image: z
    .any()
    .optional()
    .refine((file) => {
      return !Array.isArray(file)
    }, `El atributo image solo se puede enviar una vez.`)
    .refine((file) => {
      if (Array.isArray(file)) return true
      return file.size <= MAX_FILE_SIZE
    }, `Max file size is 5MB.`)
    .refine((file) => {
      if (Array.isArray(file)) return true
      return ACCEPTED_IMAGE_TYPES.includes(file.mimetype)
    }, '.jpg, .jpeg, .png and .webp files are accepted.'),
  phoneNumber: z.string(),
  address: z.string(),
  postalCode: z.string(),
  province: z.string(),
  cityRegion: z.string(),
  gender: z.string(),
  birthDate: z.nullable(z.string().date()),
  birthPlace: z.string(),
  nationality: z.string(),
  maritalStatus: z.string(),
  linkedIn: z.string(),
  webSite: z.string(),
})

export function validateApplicant(input: any) {
  return applicantSchema.partial().safeParse(input)
}

const applicantEducationSchema = z.object({
  institution: z.string({
    required_error: 'Institution is required.',
  }),
  degree: z.string({
    required_error: 'Degree is required.',
  }),
  startDate: z.nullable(z.string().date()),
  endDate: z.nullable(z.string().date()),
  description: z.string().max(2000).optional(),
})

export function validateApplicantEducation(input: any) {
  return applicantEducationSchema.safeParse(input)
}

export function validateApplicantEducationUpdate(input: any) {
  return applicantEducationSchema.partial().safeParse(input)
}

const applicantWorkExperienceSchema = z.object({
  position: z.string({
    required_error: 'Position is required.',
  }),
  employmentType: z.string({
    required_error: 'Employment type is required.',
  }),
  companyName: z.string({
    required_error: 'Company name is required.',
  }),
  location: z.string().optional(),
  workModality: z.string({
    required_error: 'Work modality is required.',
  }),
  industry: z.string().optional(),
  description: z.string().max(2000).optional(),
  startDate: z.nullable(z.string().date()),
  endDate: z.nullable(z.string().date()),
  skills: z.string().optional(),
})

export function validateApplicantWorkExperience(input: any) {
  return applicantWorkExperienceSchema.safeParse(input)
}

export function validateApplicantWorkExperienceUpdate(input: any) {
  return applicantWorkExperienceSchema.partial().safeParse(input)
}

const applicantLanguageSchema = z.object({
  competence: z.string({
    required_error: 'Competence is required.',
  }),
  language: z.string({
    required_error: 'Language type is required.',
  }),
})

export function validateApplicantLanguage(input: any) {
  return applicantLanguageSchema.safeParse(input)
}

export function validateApplicantLanguageUpdate(input: any) {
  return applicantLanguageSchema.partial().safeParse(input)
}
