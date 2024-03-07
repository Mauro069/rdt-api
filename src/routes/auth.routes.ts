import { Router } from 'express'
import { AuthController } from '../controllers/auth/index'

const router = Router()

router.post('/register', AuthController.register)
router.post('/register-applicant', AuthController.registerApplicant)
router.post('/register-company', AuthController.registerCompany)
router.post('/login', AuthController.login)
router.get('/confirm/:token', AuthController.confirm)

export default router
