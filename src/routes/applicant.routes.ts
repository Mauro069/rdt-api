/**
 * @swagger
 * /applicants/update:
 *   post:
 *     summary: Update applicant details and image
 *     description: Update the details and image of an applicant.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the applicant.
 *               lastName:
 *                 type: string
 *                 description: The last name of the applicant.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the applicant.
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Successfully updated applicant details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       '400':
 *         description: Bad request - Invalid input or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '404':
 *         description: Not Found - Applicant not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *       '500':
 *         description: Internal server error - Generic error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 */

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
