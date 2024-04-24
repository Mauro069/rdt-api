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
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Retrieve jobs for a company
 *     description: Retrieve all jobs associated with the authenticated company user.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve
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
 * /jobs/all:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get all jobs
 *     description: Retrieve all jobs with optional pagination and search parameters.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items to return per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by. Prefix with ':desc' or ':asc'.
 *       - in: query
 *         name: params
 *         schema:
 *           type: object
 *         description: Por ejemplo {"title":"program"}
 *         additionalProperties:
 *           type: string
 *         style: form
 *         explode: true
 *     responses:
 *       '200':
 *         description: A list of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           company:
 *                             type: object
 *                             properties:
 *                               image:
 *                                 type: object
 *                                 properties:
 *                                   secure_url:
 *                                     type: string
 *                                   public_id:
 *                                     type: string
 *                               user:
 *                                 type: string
 *                               businessName:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               id:
 *                                 type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           duration:
 *                             type: number
 *                           creationDate:
 *                             type: string
 *                           status:
 *                             type: string
 *                           id:
 *                             type: string
 *                     totalDocs:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pagingCounter:
 *                       type: integer
 *                     hasPrevPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     prevPage:
 *                       type: null
 *                     nextPage:
 *                       type: null
 *       '401':
 *         description: Unauthorized. Not allowed to use specified parameters.
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
 * /jobs/applicants/{jobId}:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Obtener solicitantes por ID de trabajo
 *     description: Obtiene la lista de solicitantes para un trabajo específico.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID del trabajo del cual obtener solicitantes
 *         schema:
 *           type: string
 *     security:
 *       - customToken: []
 *     responses:
 *       200:
 *         description: Lista de solicitantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID de la aplicación
 *                       job:
 *                         type: string
 *                         description: ID del trabajo al que se aplica
 *                       applicant:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: ID del solicitante
 *                           user:
 *                             type: string
 *                             description: ID del usuario asociado al solicitante
 *                           image:
 *                             type: object
 *                             properties:
 *                               secure_url:
 *                                 type: string
 *                                 description: URL segura de la imagen
 *                               public_id:
 *                                 type: string
 *                                 description: ID público de la imagen
 *                           name:
 *                             type: string
 *                             description: Nombre del solicitante
 *                           lastName:
 *                             type: string
 *                             description: Apellido del solicitante
 *                       rejectionReason:
 *                         type: string
 *                         description: Razón de rechazo (si aplicable)
 *                       status:
 *                         type: string
 *                         enum: [PENDING, SEEN, REJECTED]
 *                         description: Estado de la aplicación
 *                       creationDate:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la aplicación
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: No encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * /jobs/{jobId}:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Obtener información de un trabajo por ID
 *     description: Obtiene información detallada de un trabajo utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID del trabajo del cual obtener solicitantes
 *         schema:
 *           type: string
 *     responses:
 *         '200':
 *           description: OK. Devuelve la información del trabajo.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   job:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       company:
 *                         type: object
 *                         properties:
 *                            image:
 *                              type: object
 *                              properties:
 *                                 secure_url:
 *                                   type: string
 *                                 public_id:
 *                                   type: string
 *                            user:
 *                              type: string
 *                            businessName:
 *                              type: string
 *                            description:
 *                              type: string
 *                            id:
 *                              type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       duration:
 *                         type: number
 *                       creationDate:
 *                         type: string
 *                         format: date-time
 *                       updateDate:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         enum: ['ACTIVE', 'INACTIVE', 'PAUSED', 'DELETED']
 *         '400':
 *           description: Bad Request. El ID no fue proporcionado o no es válido.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Error del servidor. Se produjo un error al procesar la solicitud.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { JobController } from '../controllers/job'

const router = Router()

router.post('/create', [authMiddleware], JobController.create)
router.get('/', [authMiddleware], JobController.get)
router.get('/all', JobController.getAll)
router.post('/update/:jobId', [authMiddleware], JobController.update)
router.get('/applicants/:jobId', [authMiddleware], JobController.getApplicants)
router.get('/:jobId', JobController.getById)
export default router
