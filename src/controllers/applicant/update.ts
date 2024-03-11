import { Request, Response } from 'express'
import fs from 'fs-extra'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicant } from '../../schemas/applicant'
import { UploadImageResult, uploadImage } from '../../utils/uploadImage'
import { UploadedFile } from 'express-fileupload'

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const result = validateApplicant(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    if (req.files?.image) {
      const resultImage = validateApplicant(req.files)

      if (!resultImage.success) {
        if (req.files?.image) {
          const files: UploadedFile | UploadedFile[] | undefined =
            req.files?.image
          if (Array.isArray(files)) {
            for (const file of files) {
              await fs.unlink(file.tempFilePath)
            }
          } else if (files) {
            await fs.unlink(files.tempFilePath)
          }
        }

        //@ts-ignore
        res.status(400).json({ error: JSON.parse(resultImage.error.message) })
        return
      }
    }

    const { id, error, message } = getUserId(req)

    if (error) {
      res.status(401).json({ message: message })
      return
    }

    const existingApplicant = await ApplicantModel.findOne({ user: id })

    if (!existingApplicant) {
      res.status(404).json({ message: messages.error.applicantNotFound })
      return
    }

    if (req.files?.image) {
      const file: UploadedFile | UploadedFile[] | undefined = req.files?.image
      const image = file instanceof Array ? file[0] : file
      let uploadResult: UploadImageResult = await uploadImage(image)
      if (uploadResult.error) {
        res.status(401).json({ message: uploadResult.message })
        return
      }
      if (uploadResult.image) existingApplicant.image = uploadResult.image
    }

    if (result.data.hasOwnProperty('name')) {
      if (result.data.name) existingApplicant.name = result.data.name
    }

    if (result.data.hasOwnProperty('lastName')) {
      if (result.data.lastName)
        existingApplicant.lastName = result.data.lastName
    }

    await existingApplicant.save()

    res.status(201).json({ message: messages.success.applicantUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
