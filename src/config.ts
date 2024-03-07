import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: parseInt(process.env.PORT ?? '8001', 10),
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/rdt',
  SECRET: process.env.SECRET ?? 'RDT-SECRET-KEY',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'admin',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@admin.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'adminadmin',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? 'cloud_name',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? 'cloud_secret',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? 'cloud_key',
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER ?? 'rdt-app',
  APP_EMAIL_ACCOUNT: process.env.APP_EMAIL_ACCOUNT ?? 'pruebas.desarrollo.all@gmail.com',
  APP_EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD ?? 'ymkc hbdb cnex hvvq',
  APP_API_URL: process.env.APP_API_URL ?? 'localhost:8000'
}