/**
 * @swagger
 * /companies/update:
 *   post:
 *     summary: Update company information
 *     description: Endpoint to update the information of a company, including its business name, description, and image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Successfully updated company information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the company information has been updated successfully.
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating the reason for the bad request.
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user is unauthorized to perform the operation.
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the company to be updated was not found.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that an internal server error occurred.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { CompanyController } from '../controllers/company'
import { uploadMiddleware } from '../middlewares/upload'

const router = Router()

router.post(
  '/update',
  [authMiddleware, uploadMiddleware],
  CompanyController.update
)

export default router
