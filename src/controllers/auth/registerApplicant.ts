import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { IUser, UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateApplicantUser } from '../../schemas/auth'
import { env } from '../../config'
import mailService from '../../lib/nodemailer'
import { getToken } from '../../utils/jwt'
import { v4 as uuidv4 } from 'uuid'
import { ApplicantModel, IApplicant } from '../../models/applicant.model'

export async function registerApplicant(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateApplicantUser(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { username, email, password, name, lastName } = result.data

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    })

    if (existingUser) {
      res.status(400).json({ message: messages.error.existingUser })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: IUser = new UserModel({
      ...result.data,
      code: uuidv4(),
      password: hashedPassword,
    })

    const token = getToken({ username: username, code: newUser.code })

    const urlConfirm = `${env.APP_API_URL}/auth/confirm/${token}`
    const template = mailService.getConfirmTemplate(username, urlConfirm)
    mailService.send(messages.mail.registerSubject, template, email)

    await newUser.save()

    const userId = newUser._id

    const newApplicant: IApplicant = new ApplicantModel({
      user: userId,
      name: name,
      lastName: lastName,
    })

    await newApplicant.save()
    res.status(201).json({ message: messages.success.registration })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
