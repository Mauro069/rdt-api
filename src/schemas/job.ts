import z from 'zod'

const jobSchema = z.object({
  company: z.string({
    required_error: 'Company ID is required.',
  }),
  title: z.string({
    required_error: 'Title is required.',
  }),
  description: z.string({
    required_error: 'Description is required.',
  }),
  duration: z
    .number({
      required_error: 'Duration is required',
    })
    .gt(1)
    .lt(31),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PAUSED', 'DELETED']).default('ACTIVE'),
  province: z.string(),
  cityRegion: z.string(),
  workModality: z.string({
    required_error: 'Work modality is required.',
  }),
})

export function validateJob(input: any) {
  return jobSchema.partial().safeParse(input)
}
