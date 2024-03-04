import { Request, Response, NextFunction } from 'express'
import { UserType } from '../interfaces'
import { UserModel } from '../models/user.model'
import { messages } from '../utils/messages'

export function roleMiddleware(allowedType: UserType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const id = req.userId

      const existingUser = await UserModel.findById(id)

      if (!existingUser) {
        res.status(400).json({ message: messages.error.notFound })
        return
      }
      const roleValid = existingUser.userType === allowedType

      if (!roleValid) {
        res.status(400).json({ message: messages.error.unauthorized })
        return
      }

      next()
    } catch (ex) {
      res.status(400).json({ message: 'Token no válido' })
    }
  }
}
