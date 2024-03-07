import { Router } from 'express'
import { AuthController } from '../controllers/auth/index'

const router = Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/mail', AuthController.mail)
router.get('/confirm/:token', AuthController.confirm)

export default router
