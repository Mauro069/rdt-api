import { Request, Response } from 'express'
import fs from 'fs-extra'

import { messages } from '../../utils/messages'
import { getUserId } from '../../utils/getUserId'
import { ApplicantModel } from '../../models/applicant.model'
import { validateApplicant } from '../../schemas/applicant'
import { UploadImageResult, uploadImage } from '../../utils/uploadImage'
import { UploadedFile } from 'express-fileupload'
import { deleteFile } from '../../lib/cloudinary'
import { ProvinceModel } from '../../models/province'
import { GenderModel } from '../../models/gender'
import { MaritalStatusModel } from '../../models/maritalStatus'

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

    if (result.data.province) {
      const province = ProvinceModel.findOne({ _id: result.data.province })
      if (!province) {
        res.status(404).json({ message: messages.error.provinceNotFound })
        return
      }
    }

    if (result.data.gender) {
      const gender = GenderModel.findOne({ _id: result.data.gender })
      if (!gender) {
        res.status(404).json({ message: messages.error.genderNotFound })
        return
      }
    }

    if (result.data.maritalStatus) {
      const maritalStatus = MaritalStatusModel.findOne({
        _id: result.data.maritalStatus,
      })
      if (!maritalStatus) {
        res.status(404).json({ message: messages.error.maritalStatusNotFound })
        return
      }
    }

    // Actualizo el documento existente con los nuevos valores
    Object.assign(existingApplicant, result.data)

    if (req.files?.image) {
      const file: UploadedFile | UploadedFile[] | undefined = req.files?.image
      const image = file instanceof Array ? file[0] : file
      let uploadResult: UploadImageResult = await uploadImage(image)
      if (uploadResult.error) {
        res.status(401).json({ message: uploadResult.message })
        return
      }
      if (existingApplicant.image?.public_id) {
        await deleteFile(existingApplicant.image.public_id)
      }

      if (uploadResult.image) existingApplicant.image = uploadResult.image
    }

    await existingApplicant.save()

    res.status(201).json({ message: messages.success.applicantUpdated })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
