import { Request } from 'express'

export function getOrderBy(req: Request, paths: any): [string, string][] {
  const orderBy: Array<[string, string]> = [['date', 'DESC']]
  const allowedSortByFields = Object.keys(paths) as string[]
  const sortBy: string = req.query.sortBy as string

  if (!sortBy) {
    return orderBy
  }

  const parts = sortBy.split(':')

  if (!allowedSortByFields.includes(parts[0])) {
    return orderBy
  }

  if (!parts[1] || !['asc', 'desc'].includes(parts[1].toLowerCase())) {
    return orderBy
  }

  return [[parts[0], parts[1].toLowerCase()]]
}
