import { Router } from 'express'
import { UserController } from '../controllers/users/index'
import { authMiddleware } from '../middlewares/auth'
import { roleMiddleware } from '../middlewares/role'

const router = Router()

router.get(
  '/',
  [authMiddleware, roleMiddleware('ADMIN')],
  UserController.getAll
)
router.get('/detail', [authMiddleware], UserController.getDetail)

export default router
