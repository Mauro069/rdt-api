import z from 'zod'

const applicantSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
  }),
  lastName: z.string({
    required_error: 'Lastname is required.',
  }),
})

export function validateApplicant(input: any) {
  return applicantSchema.partial().safeParse(input)
}
