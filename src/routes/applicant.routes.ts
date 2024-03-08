import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { ApplicantController } from '../controllers/applicant'
import { uploadMiddleware } from '../middlewares/upload'

const router = Router()

router.post(
  '/update',
  [authMiddleware, uploadMiddleware],
  ApplicantController.update
)

export default router
