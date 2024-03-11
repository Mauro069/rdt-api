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
})

export function validateApplicant(input: any) {
  return applicantSchema.partial().safeParse(input)
}
