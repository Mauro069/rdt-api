import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model'
import { env } from '../config'
import { userStatus, userType } from '../utils/constants'
import { v4 as uuidv4 } from 'uuid'

export function connectToDatabase() {
  const mongooseOptions = {}

  mongoose.connect(env.MONGODB_URI, mongooseOptions)

  const connection = mongoose.connection

  connection.once('open', () => {
    console.log('Conexión a MongoDB establecida')
    initial()
  })

  connection.on('error', (error: Error) => {
    console.error('Error de conexión a MongoDB:', error)
  })
}

async function initial() {
  const userCount = await UserModel.estimatedDocumentCount({})
  if (userCount === 0) await createAdminUser()
}

const createAdminUser = async () => {
  try {
    const adminUser = new UserModel({
      username: env.ADMIN_USERNAME,
      email: env.ADMIN_EMAIL,
      password: bcrypt.hashSync(env.ADMIN_PASSWORD, 8),
      code: uuidv4(),
      userType: userType.ADMIN,
      status: userStatus.VERIFIED,
    })
    const savedInstance = await adminUser.save()
    console.log('Usuario admin created', savedInstance)
  } catch (err) {
    console.error(err)
  }
}
