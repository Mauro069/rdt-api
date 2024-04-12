import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import mailService from '../../lib/nodemailer'
import { validateContact } from '../../schemas/contact'
import { env } from '../../config'

export async function send(req: Request, res: Response): Promise<void> {
  try {
    const result = validateContact(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const {name, lastName, email, message} = result.data

    const template = mailService.geContactTemplate(
      name,
      lastName,
      email,
      message
    )

    mailService.send(
      messages.mail.newContactSubjet,
      template,
      env.APP_EMAIL_ACCOUNT
    )

    res.status(201).json({ message: messages.success.contactSent })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
