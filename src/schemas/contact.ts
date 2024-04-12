import z from 'zod'

const contactSchema = z.object({
  name: z.string({
    required_error: 'Name ID is required.',
  }),
  lastName: z.string({
    required_error: 'Last name is required.',
  }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  message: z.string({
    required_error: 'Message is required.',
  }),
})

export function validateContact(input: any) {
  return contactSchema.safeParse(input)
}
