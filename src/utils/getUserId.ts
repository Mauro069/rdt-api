import { Request } from 'express'

import { getTokenData } from './jwt'
import { messages } from './messages'

export interface GetUserIdResult {
  error: boolean
  message: string
  id?: string | number
}

export function getUserId(req: Request): GetUserIdResult {
  const token = req.headers.authorization

  if (!token) {
    return { error: true, message: messages.error.unauthorized }
  }

  const data = getTokenData(token)

  if (!data || !data.userId) {
    return { error: true, message: messages.error.unauthorized }
  }

  return {
    error: false,
    message: messages.success.foundUser,
    id: data.userId,
  }
}
