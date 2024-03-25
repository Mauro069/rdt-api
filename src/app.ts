import express from 'express'
import authRoutes from './routes/auth.routes'
import applicantRoutes from './routes/applicant.routes'
import applicationRoutes from './routes/application.routes'
import companyRoutes from './routes/company.routes'
import jobRoutes from './routes/job.routes'
import filterRoutes from './routes/filter.routes'
import provinceRoutes from './routes/province.routes'
import genderRoutes from './routes/gender.routers'
import employmentTypeRoutes from './routes/employmentType.routes'
import competenceRoutes from './routes/competence.routes'
import workModalityRoutes from './routes/workModality.routes'
import maritalStatusRoutes from './routes/maritalStatus.routes'
import { connectToDatabase } from './lib/mongodb'
import { setupSwaggerDocs } from './lib/swagger'
import { env } from './config'
import { MessageResponse } from './interfaces'
import { corsMiddleware } from './middlewares/cors'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
const port = env.PORT || 8000

app.use(express.json())
app.use(morgan('dev'))
//app.use(corsMiddleware())
app.use(cors())
app.disable('x-powered-by')

app.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'Hi there, rdt api is working... 🌈 ',
  })
})

app.use(express.static('./public'))
app.use('/auth', authRoutes)
app.use('/applicants', applicantRoutes)
app.use('/applications', applicationRoutes)
app.use('/companies', companyRoutes)
app.use('/jobs', jobRoutes)
app.use('/filters', filterRoutes)
app.use('/provinces', provinceRoutes)
app.use('/gender', genderRoutes)
app.use('/employment-type', employmentTypeRoutes)
app.use('/competence', competenceRoutes)
app.use('/work-modality', workModalityRoutes)
app.use('/marital-status', maritalStatusRoutes)

setupSwaggerDocs(app)

app.listen(port, () => {
  connectToDatabase()
  console.log(`El servidor está escuchando en el puerto ${port}`)
})

export default app
