import { UploadedFile } from 'express-fileupload'
import fs from 'fs-extra'

import { uploadFile } from '../lib/cloudinary'
import { messages } from './messages'

interface ImageInfo {
  public_id: string
  secure_url: string
}

export interface UploadImageResult {
  error: boolean
  message: string
  image?: ImageInfo
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

export const uploadImage = async (
  files: UploadedFile | undefined
): Promise<UploadImageResult> => {
  if (!validateFileSize(files)) {
    if (files) await fs.unlink(files.tempFilePath)
    return {
      error: true,
      message: 'Archivo supera tamaño máximo',
    }
  }

  if (files) {
    const result = await uploadFile(files.tempFilePath)
    let image: ImageInfo = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    }
    await fs.unlink(files.tempFilePath)
    return {
      image,
      error: false,
      message: messages.success.uploadingFile,
    }
  }

  return {
    error: true,
    message: messages.error.uploadingFile,
  }
}
