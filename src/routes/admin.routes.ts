/**
 *  @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints relacionados con cuestiones administrativas
 */

/**
 * @swagger
 * /admin/update-user-status:
 *   put:
 *     summary: Actualizar el estado de un usuario
 *     description: Este endpoint permite a un administrador actualizar el estado de un usuario.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - status
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario a actualizar.
 *               status:
 *                 type: string
 *                 enum: [UNVERIFIED, VERIFIED, SUSPENDED]
 *                 default: VERIFIED
 *                 description: Estado nuevo del usuario (UNVERIFIED, VERIFIED, SUSPENDED).
 *     security:
 *       - customToken: []
 *     responses:
 *       201:
 *         description: Estado del usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       400:
 *         description: Error de validación de entrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Detalles del error de validación.
 *       401:
 *         description: Usuario no autorizado o no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error genérico.
 *                 error:
 *                   type: object
 *                   description: Detalles del error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { AdminController } from '../controllers/admin'

const router = Router()

router.put(
  '/update-user-status',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AdminController.updateUserStatus
)

export default router
