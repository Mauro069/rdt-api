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
 * /companies/:
 *   get:
 *     summary: Obtiene los datos de la companía.
 *     description: Obtiene los datos del companía autenticado.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Datos del companía obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applicant:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           description: Nombre de usuario.
 *                         email:
 *                           type: string
 *                           description: Dirección de correo electrónico.
 *                         password:
 *                           type: string
 *                           description: Contraseña del usuario.
 *                         code:
 *                           type: string
 *                           description: Código de usuario.
 *                         status:
 *                           type: string
 *                           enum: [UNVERIFIED, VERIFIED, SUSPENDED]
 *                           description: Estado del usuario.
 *                         userType:
 *                           type: string
 *                           enum: [APPLICANT, COMPANY, ADMIN]
 *                           description: Tipo de usuario.
 *                     image:
 *                       type: object
 *                       properties:
 *                         secure_url:
 *                           type: string
 *                           description: URL segura de la imagen.
 *                         public_id:
 *                           type: string
 *                           description: ID público de la imagen.
 *                     businessName:
 *                       type: string
 *                       description: Business Name de la companía.
 *                     description:
 *                       type: string
 *                       description: Descripción de la companía.
 *       '401':
 *         description: No autorizado - Fallo en la autenticación del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica la causa del fallo.
 *       '500':
 *         description: Error interno del servidor - Error genérico.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica la causa del fallo.
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
router.get('/', [authMiddleware], CompanyController.get)

export default router
