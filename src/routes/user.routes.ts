import { Router } from 'express'
import { UserController } from '../controllers/users/index'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'

const router = Router()

router.get(
  '/',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  UserController.getAll
)
router.get('/detail', [authMiddleware], UserController.getDetail)

export default router
