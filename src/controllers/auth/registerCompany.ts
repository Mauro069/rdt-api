import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { UserModel } from '../../models/user.model'
import { messages } from '../../utils/messages'
import { validateCompanyUser } from '../../schemas/users'
import { IUser } from '../../interfaces'
import { env } from '../../config'
import mailService from '../../lib/nodemailer'
import { getToken } from '../../utils/jwt'
import { v4 as uuidv4 } from 'uuid'
import { userType } from '../../utils/constants'
import { CompanyModel, ICompany } from '../../models/company.model'

export async function registerCompany(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = validateCompanyUser(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    const { username, email, password, businessName, industry } = result.data

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
      userType: userType.COMPANY,
      password: hashedPassword,
    })

    const token = getToken({ username: username, code: newUser.code })

    const urlConfirm = `${env.APP_API_URL}/auth/confirm/${token}`
    const template = mailService.getTemplate(username, urlConfirm)

    mailService.send('Registro RDT - Confirmá tu correo', template, email)

    await newUser.save()

    const userId = newUser._id

    const newCompany: ICompany = new CompanyModel({
      user: userId,
      businessName: businessName,
      industry: industry,
    })

    await newCompany.save()
    res.status(201).json({ message: messages.success.registration })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
