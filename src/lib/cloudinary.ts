import { v2 as cloudinary } from 'cloudinary'
import { env } from '../config'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const uploadFile = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: env.CLOUDINARY_FOLDER,
  })
}

export const deleteFile = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
}
