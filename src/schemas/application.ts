import z from 'zod'

const applicationCreateSchema = z.object({
  job: z.string({
    required_error: 'Job ID is required.',
  }),
})

export function validateCreateApplication(input: any) {
  return applicationCreateSchema.safeParse(input)
}

const applicationSchema = z.object({
  job: z
    .string({
      required_error: 'Job ID is required.',
    })
    .min(1),
  applicant: z.string({
    required_error: 'Applicant ID is required.',
  }),
  reason: z.string({
    required_error: 'Reason is required.',
  }),
  status: z.enum(['PENDING', 'SEEN', 'REJECTED', 'CHOSEN']).default('PENDING'),
})

export function validateApplication(input: any) {
  return applicationSchema.partial().safeParse(input)
}

const applicationUodateSchema = z.object({
  reason: z.string({
    required_error: 'Reason is required.',
  }),
  status: z.enum(['PENDING', 'SEEN', 'REJECTED', 'CHOSEN']).default('PENDING'),
})

export function validateUpdateApplication(input: any) {
  return applicationUodateSchema.partial().safeParse(input)
}
