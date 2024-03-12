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
  rejectionReason: z.string({
    required_error: 'Rejection reason is required.',
  }),
  status: z.enum(['PENDING', 'SEEN', 'REJECTED']).default('PENDING'),
})

export function validateApplication(input: any) {
  return applicationSchema.partial().safeParse(input)
}
