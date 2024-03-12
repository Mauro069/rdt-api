/**
 *  @swagger
 * tags:
 *   name: Jobs
 *   description: Endpoints relacionados con los avisos de trabajo
 */

/**
 * @swagger
 * /jobs/create:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: Crear un nuevo trabajo
 *     description: Crea un nuevo trabajo en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del trabajo.
 *               description:
 *                 type: string
 *                 description: Descripción del trabajo.
 *               duration:
 *                 type: number
 *                 description: Duración del trabajo en días.
 *             required:
 *               - company
 *               - title
 *               - description
 *               - duration
 *               - creationDate
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Trabajo creado exitosamente.
 *       '400':
 *         description: Error de validación en los datos del trabajo.
 *       '401':
 *         description: No autorizado - Fallo en la autenticación del usuario.
 *       '404':
 *         description: No se encontró la empresa asociada al usuario.
 *       '500':
 *         description: Error interno del servidor - Error genérico.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { JobController } from '../controllers/job'

const router = Router()

router.post('/create', [authMiddleware], JobController.create)

export default router
