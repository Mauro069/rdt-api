import express from 'express'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import applicantRoutes from './routes/applicant.routes'
import companyRoutes from './routes/company.routes'
import { connectToDatabase } from './lib/mongodb'
import { setupSwaggerDocs } from './lib/swagger'
import { env } from './config'
import { MessageResponse } from './interfaces'
import { corsMiddleware } from './middlewares/cors'
import morgan from 'morgan'

const app = express()
const port = env.PORT || 8000

app.use(express.json())
app.use(morgan('dev'))
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'Hi there, rdt api is working... 🌈 ',
  })
})

app.use(express.static('./public'))
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/applicants', applicantRoutes)
app.use('/companies', companyRoutes)

setupSwaggerDocs(app)

app.listen(port, () => {
  connectToDatabase()
  console.log(`El servidor está escuchando en el puerto ${port}`)
})

export default app
