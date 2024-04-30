import { Request, Response } from 'express'

import { IUser, UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateForgotPassword } from '../../schemas/auth'
import mailService from '../../lib/nodemailer'
import { env } from '../../config'

export async function forgotPassword(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateForgotPassword(req.body)

    if (!result.success) {
      // @ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { userOrMail } = result.data

    const user: IUser | null = await UserModel.findOne({
      $or: [{ username: userOrMail }, { email: userOrMail }],
    })

    if (!user) {
      res.status(401).json({ message: messages.error.userOrMailNotExists })
      return
    }

    const urlConfirm = `${env.APP_FORGOT_PAGE}/?login=${user.username}&key=${user.code}`
    const template = mailService.getForgotPasswordTemplate(
      user.username,
      urlConfirm
    )
    mailService.send(messages.mail.forgotSubject, template, user.email)

    res.status(201).json({ message: messages.success.passwordForgot })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
