import { Request, Response } from 'express'
import { messages } from '../../utils/messages'
import mailService from '../../lib/nodemailer'

export async function mail(req: Request, res: Response): Promise<void> {
  try {
    mailService.send("aa","bb","pabloj.pedraza@gmail.com")
    res.status(200).json({ message: messages.success.login })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
