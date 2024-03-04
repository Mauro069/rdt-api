import { Request } from 'express'
import jwt from 'jsonwebtoken'

import { DecodedToken } from '../interfaces'
import { messages } from './messages'
import { env } from '../config'

export interface GetUserIdkResult {
  error: boolean
  message: string
  id?: string | number
}

export function getUserId(req: Request): GetUserIdkResult {
  const token = req.headers.authorization

  if (!token) {
    return { error: true, message: messages.error.unauthorized }
  }

  const decodedToken = jwt.verify(token, env.SECRET) as DecodedToken

  if (!decodedToken || !decodedToken.userId) {
    return { error: true, message: messages.error.unauthorized }
  }

  return {
    error: false,
    message: messages.success.foundUser,
    id: decodedToken.userId,
  }
}
