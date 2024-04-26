import { Request } from 'express'

export function getOptions(req: Request, paths: any): any {
  const allowedSortByFields = Object.keys(paths) as string[]
  const queryOptions = req.query
  const sortBy: string = queryOptions.sortBy as string

  let options: { page?: string; limit?: string; sort?: string } = {}

  if (typeof queryOptions.page === 'string') options.page = queryOptions.page
  if (typeof queryOptions.limit === 'string') options.limit = queryOptions.limit

  if (!sortBy) {
    return options
  }

  const [field, order] = sortBy.split(':')

  if (!allowedSortByFields.includes(field)) {
    return options
  }

  if (!order || !['asc', 'desc'].includes(order.toLowerCase())) {
    return options
  }

  //@ts-ignore
  options.sort = {
    [field]: order.toLowerCase(),
  }

  return options
}
