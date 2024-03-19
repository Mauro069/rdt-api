import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

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
  province: z.string(), // O puedes usar z.string() si no tienes definido el esquema de ObjectId
  cityRegion: z.string(),
  gender: z.string(), // O puedes usar z.string() si no tienes definido el esquema de ObjectId
  birthDate: z.coerce.date(),
  birthPlace: z.string(),
  nationality: z.string(),
  maritalStatus: z.string(), // O puedes usar z.string() si no tienes definido el esquema de ObjectId
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
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
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
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  skills: z.string().optional(),
})

export function validateApplicantWorkExperience(input: any) {
  return applicantWorkExperienceSchema.safeParse(input)
}

export function validateApplicantWorkExperienceUpdate(input: any) {
  return applicantWorkExperienceSchema.partial().safeParse(input)
}
