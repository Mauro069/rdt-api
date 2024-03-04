import { UploadedFile } from 'express-fileupload'
import fs from 'fs-extra'

import { uploadFile } from '../lib/cloudinary'
import { messages } from './messages'
import { ResourceType } from '../interfaces'

interface EvidenceInfo {
  public_id: string
  secure_url: string
  resource_type: ResourceType
}

export interface UploadEvidencesResult {
  error: boolean
  message: string
  evidences: EvidenceInfo[] | []
}

const validateFileSize = (files: UploadedFile | UploadedFile[] | undefined) => {
  const MAX_SIZE = 20 * 1024 * 1024 // 20 MB como máximo
  //const MAX_SIZE = 1 * 1024 * 1024; // 1 MB como máximo
  if (files instanceof Array) {
    return files.every((f) => {
      return f.size <= MAX_SIZE
    })
  } else {
    return files?.size ? files?.size <= MAX_SIZE : false
  }
}

export const uploadEvidences = async (
  files: UploadedFile | UploadedFile[] | undefined
): Promise<UploadEvidencesResult> => {
  let error = false
  let message = messages.success.uploadingFile
  let evidences: EvidenceInfo[] = []

  if (!validateFileSize(files)) {
    if (files instanceof Array) {
      files.forEach(async (f) => await fs.unlink(f.tempFilePath))
    } else {
      if (files) await fs.unlink(files.tempFilePath)
    }

    return {
      evidences,
      error: true,
      message: 'Archivo supera tamaño máximo',
    }
  }

  if (files instanceof Array) {
    const imagePromises = files.map(async (f) => {
      let resourceType: ResourceType = 'image'
      if (f.mimetype) {
        if (f.mimetype.startsWith('video/')) {
          resourceType = 'video'
        }
        const result = await uploadFile(f.tempFilePath, resourceType)
        evidences.push({
          public_id: result.public_id,
          secure_url: result.secure_url,
          resource_type: resourceType,
        })
        await fs.unlink(f.tempFilePath)
      } else {
        error = true
        message = 'No se pudo determinar el tipo de archivo.'
      }
    })

    await Promise.all(imagePromises)
  } else if (files) {
    let resourceType: ResourceType = 'image'
    if (files.mimetype) {
      if (files.mimetype.startsWith('video/')) {
        resourceType = 'video'
      }
      const result = await uploadFile(files.tempFilePath, resourceType)
      evidences.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
        resource_type: resourceType,
      })
      await fs.unlink(files.tempFilePath)
    } else {
      error = true
      message = 'No se pudo determinar el tipo de archivo.'
    }
  } else {
    error = true
    message = messages.error.uploadingFile
  }

  return {
    evidences,
    error,
    message,
  }
}
