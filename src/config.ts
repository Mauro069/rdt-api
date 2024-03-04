import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: parseInt(process.env.PORT ?? '8001', 10),
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/rtd',
  SECRET: process.env.SECRET ?? 'RTD-SECRET-KEY',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'admin',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@admin.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'adminadmin',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? 'cloud_name',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? 'cloud_secret',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? 'cloud_key',
}

export const status = {
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  APPROVED: 'APPROVED',
}
