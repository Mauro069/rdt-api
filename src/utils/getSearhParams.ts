import { Request } from 'express'

export interface SearchParams {
  searchParam: Object
  isValid: boolean
}

export function getSearhParams(req: Request, paths: any): SearchParams {
  const queryParams = req.query
  const fields = Object.keys(paths) as string[]
  const allowedParams = ['page', 'limit', 'sortBy']

  const validParams = Object.keys(queryParams).every(
    (param) => fields.includes(param) || allowedParams.includes(param)
  )

  if (!validParams) {
    return {
      searchParam: {},
      isValid: false,
    }
  }

  const searchParam: any = {}
  fields.forEach((param) => {
    if (!allowedParams.includes(param) && queryParams[param] !== undefined) {
      //@ts-ignore
      searchParam[param] = { $regex: new RegExp(queryParams[param], 'i') }
    }
  })

  return {
    searchParam,
    isValid: true,
  }
}
