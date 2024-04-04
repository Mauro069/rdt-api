import dotenv from 'dotenv'
import { Schedule } from './interfaces'
dotenv.config()

export const env = {
  PORT: parseInt(process.env.PORT ?? '8000', 10),
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/rdt',
  SECRET: process.env.SECRET ?? 'RDT-SECRET-KEY',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'admin',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@admin.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'adminadmin',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? 'cloud_name',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? 'cloud_secret',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? 'cloud_key',
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER ?? 'rdt-app',
  APP_EMAIL_ACCOUNT:
    process.env.APP_EMAIL_ACCOUNT ?? 'pruebas.desarrollo.all@gmail.com',
  APP_EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD ?? 'ymkc hbdb cnex hvvq',
  APP_API_URL: process.env.APP_API_URL ?? 'http://localhost:8000',
  APP_CONFIRM_PAGE: process.env.APP_CONFIRM_PAGE ?? '/confirm.html',
  APP_ERROR_CODE_PAGE: process.env.APP_ERROR_CODE_PAGE ?? '/error.html',
  APP_RUN_SCHEDULE: process.env.APP_RUN_SCHEDULE ?? 'false',
  SCHEDULE_INACTIVE_DURATION: parseInt(
    process.env.SCHEDULE_INACTIVE_DURATION ?? '30'
  ),
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME ?? '24h',
}

export const schedule: Schedule = {
  cleaner: {
    frecuency: process.env.SCHEDULE_INACTIVE_JOBS ?? '*/15 * * * * *',
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
