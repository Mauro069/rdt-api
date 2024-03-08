import { Request, Response, NextFunction } from 'express'
import { UserType } from '../interfaces'
import { UserModel } from '../models/user.model'
import { messages } from '../utils/messages'

export function userTypeMiddleware(allowedType: UserType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const id = req.userId

      const existingUser = await UserModel.findById(id)

      if (!existingUser) {
        res.status(400).json({ message: messages.error.notFound })
        return
      }
      const isallowed = existingUser.userType === allowedType

      if (!isallowed) {
        res.status(400).json({ message: messages.error.unauthorized })
        return
      }

      next()
    } catch (ex) {
      res.status(400).json({ message: 'Token no válido' })
    }
  }
}
