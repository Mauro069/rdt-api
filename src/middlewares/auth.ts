import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { messages } from '../utils/messages'
import { DecodedToken } from '../interfaces'
import { env } from '../config'
import { UserModel } from '../models/user.model'
import { userStatus } from '../utils/constants'

export async function authMiddleware(
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

    const user = await UserModel.findOne({
      _id: decoded.userId,
      status: { $ne: userStatus.SUSPENDED },
    })

    if (!user) {
      return res.status(401).json({ message: messages.error.userSuspended })
    }

    // @ts-ignore
    req.userId = decoded.userId
    next()
    return
  } catch (ex) {
    return res.status(400).json({ message: messages.error.tokenNotValid })
  }
}
