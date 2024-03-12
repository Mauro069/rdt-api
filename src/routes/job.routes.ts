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
 * /jobs:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: Retrieve jobs for a company
 *     description: Retrieve all jobs associated with the authenticated company user.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       company:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       duration:
 *                         type: number
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Company not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /jobs/update/{jobId}:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: Update a job
 *     description: Update the details of a job.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: The ID of the job to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - ACTIVE
 *                   - INACTIVE
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Job updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad Request. Invalid data provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Job or Company not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { JobController } from '../controllers/job'

const router = Router()

router.post('/create', [authMiddleware], JobController.create)
router.post('/', [authMiddleware], JobController.get)
router.post('/update/:jobId', [authMiddleware], JobController.update)
export default router
