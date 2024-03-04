import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { messages } from '../utils/messages'
import { DecodedToken } from '../interfaces'
import { env } from '../config'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('authorization')

  if (!token) {
    return res.status(401).json({ message: messages.error.tokenNotFound })
  }

  try {
    const decoded = jwt.verify(token, env.SECRET!) as DecodedToken

    // @ts-ignore
    req.userId = decoded.userId
    next()
    return
  } catch (ex) {
    return res.status(400).json({ message: messages.error.tokenNotValid })
  }
}
