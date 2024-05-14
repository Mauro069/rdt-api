/**
 *  @swagger
 * tags:
 *   name: Applications
 *   description: Endpoints relacionados con las postulaciones
 */

/**
 * @swagger
 * /applications/create:
 *   post:
 *     tags:
 *       - Applications
 *     summary: Crear una aplicación
 *     description: Crea una nueva aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job:
 *                 type: string
 *                 description: ID del trabajo al que aplicar.
 *             required:
 *               - job
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Aplicación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Solicitud incorrecta. Datos inválidos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: No autorizado. El usuario no está autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Solicitante o trabajo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Obtener todas las aplicaciones del solicitante
 *     description: Recupera todas las aplicaciones asociadas al solicitante autenticado.
 *     security:
 *       - customToken: []
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
 *         description: Una lista de aplicaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           job:
 *                             type: object
 *                             properties:
 *                               company:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               duration:
 *                                 type: number
 *                               creationDate:
 *                                 type: string
 *                               status:
 *                                 type: string
 *                               id:
 *                                 type: string
 *                           applicant:
 *                             type: string
 *                           status:
 *                             type: string
 *                           creationDate:
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
 *         description: No autorizado. El usuario no está autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Solicitante no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /applications/all:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Obtener todas las aplicaciones
 *     description: Recupera todas las aplicaciones con parámetros opcionales de paginación y búsqueda.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Número de elementos a devolver por página.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Campo por el cual ordenar. Prefijo '-' para orden descendente.
 *       - in: query
 *         name: params
 *         schema:
 *           type: object
 *         description: Por ejemplo {"title":"program"}
 *         additionalProperties:
 *           type: string
 *         style: form
 *         explode: true
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Una lista de aplicaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           job:
 *                             type: object
 *                             properties:
 *                               company:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               duration:
 *                                 type: number
 *                               creationDate:
 *                                 type: string
 *                               status:
 *                                 type: string
 *                               id:
 *                                 type: string
 *                           applicant:
 *                             type: string
 *                           status:
 *                             type: string
 *                           creationDate:
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
 *         description: No autorizado. No se permiten los parámetros especificados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /applications/update/{applicationId}:
 *   post:
 *     tags:
 *       - Applications
 *     summary: Actualizar solicitud de aplicación
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         description: ID de la solicitud de aplicación a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 description: Razón de rechazo de la solicitud (opcional)
 *               status:
 *                 type: string
 *                 enum: [PENDING, SEEN, REJECTED]
 *                 description: Estado de la solicitud (opcional)
 *     security:
 *       - customToken: []
 *     responses:
 *       201:
 *         description: Solicitud de aplicación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Parámetros de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     rejectionReason:
 *                       type: string
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
 * /applications/applied/{applicationId}:
 *   get:
 *     summary: Verificar si un solicitante ha aplicado a una aplicación específica.
 *     description: Este endpoint permite verificar si un solicitante ha aplicado a una aplicación específica.
 *     tags:
 *       - Applications
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         description: ID de la aplicación a verificar.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Éxito en la verificación de la aplicación del solicitante.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applied:
 *                   type: boolean
 *                   description: Indica si el solicitante ha aplicado a la aplicación especificada.
 *       401:
 *         description: Error de autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error de autenticación.
 *       404:
 *         description: El solicitante no ha sido encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el solicitante no ha sido encontrado.
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
import { ApplicationController } from '../controllers/application'

const router = Router()

router.post('/create', [authMiddleware], ApplicationController.create)
router.get('/', [authMiddleware], ApplicationController.get)
router.get('/all', [authMiddleware], ApplicationController.getAll)
router.post(
  '/update/:applicationId',
  [authMiddleware],
  ApplicationController.update
)
router.get(
  '/applied/:applicationId',
  [authMiddleware],
  ApplicationController.applied
)
export default router
