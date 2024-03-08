import { Router } from 'express'
import { AuthController } from '../controllers/auth/index'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'

const router = Router()

router.post(
  '/register',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AuthController.register
)
router.post('/register-applicant', AuthController.registerApplicant)
router.post('/register-company', AuthController.registerCompany)
router.post('/login', AuthController.login)
router.get('/confirm/:token', AuthController.confirm)

export default router
