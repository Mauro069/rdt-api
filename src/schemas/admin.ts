import z from 'zod'

const updateUserStatusSchema = z.object({
  username: z.string({
    required_error: 'Username is required.',
  }),
  status: z.enum(['UNVERIFIED', 'VERIFIED', 'SUSPENDED']).default('VERIFIED'),
})

export function validateUpdateUserStatusSchema(input: any) {
  return updateUserStatusSchema.safeParse(input)
}
