import { Request, Response } from 'express'
import fs from 'fs-extra'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { CompanyModel } from '../../models/company.model'
import { validateCompany } from '../../schemas/company'
import { UploadImageResult, uploadImage } from '../../utils/uploadImage'
import { UploadedFile } from 'express-fileupload'
import { deleteFile } from '../../lib/cloudinary'

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const result = validateCompany(req.body)

    if (!result.success) {
      //@ts-ignore
      res.status(400).json({ error: JSON.parse(result.error.message) })
      return
    }

    if (req.files?.image) {
      const resultImage = validateCompany(req.files)

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

    const existingCompany = await CompanyModel.findOne({ user: id })

    if (!existingCompany) {
      res.status(404).json({ message: messages.error.companyNotFound })
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
      if (existingCompany.image?.public_id) {
        await deleteFile(existingCompany.image.public_id)
      }

      if (uploadResult.image) existingCompany.image = uploadResult.image
    }

    if (result.data.hasOwnProperty('businessName')) {
      if (result.data.businessName)
        existingCompany.businessName = result.data.businessName
    }

    if (result.data.hasOwnProperty('description')) {
      if (result.data.description)
        existingCompany.description = result.data.description
    }

    await existingCompany.save()

    res.status(201).json({ message: messages.success.companyUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
