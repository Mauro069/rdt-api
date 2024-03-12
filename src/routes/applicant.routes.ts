/**
 *  @swagger
 * tags:
 *   name: Applicants
 *   description: Endpoints relacionados con los postulantes
 */

/**
 * @swagger
 * /applicants/update:
 *   post:
 *     tags:
 *       - Applicants
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
 * /applicants/:
 *   get:
 *     tags:
 *       - Applicants
 *     summary: Obtiene los datos del solicitante.
 *     description: Obtiene los datos del solicitante autenticado.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Datos del solicitante obtenidos con éxito.
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
 *                     name:
 *                       type: string
 *                       description: Nombre del solicitante.
 *                     lastName:
 *                       type: string
 *                       description: Apellido del solicitante.
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
import { ApplicantController } from '../controllers/applicant'
import { uploadMiddleware } from '../middlewares/upload'

const router = Router()

router.post(
  '/update',
  [authMiddleware, uploadMiddleware],
  ApplicantController.update
)

router.get('/', [authMiddleware], ApplicantController.get)

export default router
