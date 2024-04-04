import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { isValidToken } from '../../utils/jwt'

export async function verifyToken(req: Request, res: Response): Promise<void> {
  try {
    const token = req.header('authorization')

    if (!token) {
      res.status(401).json({ message: messages.error.tokenNotFound })
      return
    }

    res.status(200).json({ isValid: isValidToken(token) })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
