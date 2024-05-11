import dotenv from 'dotenv'
import * as joi from 'joi'
import { Schedule } from './interfaces'
dotenv.config()

interface envVars {
  PORT: string
  MONGODB_URI: string
  SECRET: string
  ADMIN_USERNAME: string
  ADMIN_EMAIL: string
  ADMIN_PASSWORD: string
  CLOUDINARY_CLOUD_NAME: string
  CLOUDINARY_API_SECRET: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_FOLDER: string
  APP_EMAIL_ACCOUNT: string
  APP_EMAIL_PASSWORD: string
  APP_API_URL: string
  APP_FORGOT_PAGE: string
  APP_CONFIRM_PAGE: string
  APP_ERROR_CODE_PAGE: string
  APP_RUN_SCHEDULE: string
  SCHEDULE_INACTIVE_DURATION: string
  JWT_EXPIRE_TIME: string
  SCHEDULE_INACTIVE_JOBS: string
}

const envsSchema = joi
  .object({
    PORT: joi.string().required(),
    MONGODB_URI: joi.string().required(),
    SECRET: joi.string().required(),
    ADMIN_USERNAME: joi.string().required(),
    ADMIN_EMAIL: joi.string().required(),
    ADMIN_PASSWORD: joi.string().required(),
    CLOUDINARY_CLOUD_NAME: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_FOLDER: joi.string().required(),
    APP_EMAIL_ACCOUNT: joi.string().required(),
    APP_EMAIL_PASSWORD: joi.string().required(),
    APP_API_URL: joi.string().required(),
    APP_FORGOT_PAGE: joi.string().required(),
    APP_CONFIRM_PAGE: joi.string().required(),
    APP_ERROR_CODE_PAGE: joi.string().required(),
    APP_RUN_SCHEDULE: joi.string().required(),
    SCHEDULE_INACTIVE_DURATION: joi.string().required(),
    JWT_EXPIRE_TIME: joi.string().required(),
    SCHEDULE_INACTIVE_JOBS: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envsSchema.validate({
  ...process.env,
})

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars: envVars = value

export const env = {
  PORT: parseInt(envVars.PORT ?? '4000', 10),
  MONGODB_URI: envVars.MONGODB_URI ?? 'mongodb://127.0.0.1/rdt',
  SECRET: envVars.SECRET ?? 'RDT-SECRET-KEY',
  ADMIN_USERNAME: envVars.ADMIN_USERNAME ?? 'admin',
  ADMIN_EMAIL: envVars.ADMIN_EMAIL ?? 'admin@admin.com',
  ADMIN_PASSWORD: envVars.ADMIN_PASSWORD ?? 'adminadmin',
  CLOUDINARY_CLOUD_NAME: envVars.CLOUDINARY_CLOUD_NAME ?? 'cloud_name',
  CLOUDINARY_API_SECRET: envVars.CLOUDINARY_API_SECRET ?? 'cloud_secret',
  CLOUDINARY_API_KEY: envVars.CLOUDINARY_API_KEY ?? 'cloud_key',
  CLOUDINARY_FOLDER: envVars.CLOUDINARY_FOLDER ?? 'rdt-app',
  APP_EMAIL_ACCOUNT:
    envVars.APP_EMAIL_ACCOUNT ?? 'pruebas.desarrollo.all@gmail.com',
  APP_EMAIL_PASSWORD: envVars.APP_EMAIL_PASSWORD ?? 'ymkc hbdb cnex hvvq',
  APP_API_URL: envVars.APP_API_URL ?? 'http://localhost:4000',
  APP_FORGOT_PAGE: envVars.APP_FORGOT_PAGE ?? '/forgot.html',
  APP_CONFIRM_PAGE: envVars.APP_CONFIRM_PAGE ?? '/confirm.html',
  APP_ERROR_CODE_PAGE: envVars.APP_ERROR_CODE_PAGE ?? '/error.html',
  APP_RUN_SCHEDULE: envVars.APP_RUN_SCHEDULE ?? 'false',
  SCHEDULE_INACTIVE_DURATION: parseInt(
    envVars.SCHEDULE_INACTIVE_DURATION ?? '30'
  ),
  JWT_EXPIRE_TIME: envVars.JWT_EXPIRE_TIME ?? '24h',
  SCHEDULE_INACTIVE_JOBS: envVars.SCHEDULE_INACTIVE_JOBS ?? '*/15 * * * * *',
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 1MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const schedule: Schedule = {
  cleaner: {
    frecuency: env.SCHEDULE_INACTIVE_JOBS,
    handler: 'src/handlers/setInactiveJobs',
  },
}

/*
  FORMATO DE FRECUENCIA

 ┌────────────── second (0 - 59) (optional)
 │ ┌──────────── minute (0 - 59) 
 │ │ ┌────────── hour (0 - 23)
 │ │ │ ┌──────── day of the month (1 - 31)
 │ │ │ │ ┌────── month (1 - 12)
 │ │ │ │ │ ┌──── day of the week (0 - 6) (0 and 7 both represent Sunday)
 │ │ │ │ │ │
 │ │ │ │ │ │
 * * * * * * 

 *: An asterisk means “every interval”. For example, if the asterisk symbol is in the “month” field, it means the task is run every month.
 ,: The comma allows us to specify a list of values for repetition. For example, if we have 1, 3, 5 in the “month” field, the task will run in months 1, 3, and 5 (January, March, and May).
 -: The hyphen allows us to specify a range of values. If we have 1-5 in the “day of the week” field, the task will run every weekday (from Monday to Friday).
 /: The slash allows us to specify expressions like “every xth interval”. If we have asterisk/4 in the “hour” field, it means the action will be performed every 4 hours.

 */
