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
 * /admin/get-cvs:
 *   get:
 *     summary: Get CVs of all applicants.
 *     description: Retrieve the CVs of all applicants, including their personal information, work experiences, educations, and languages.
 *     tags:
 *       - Admin
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
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: CVs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   applicant:
 *                     type: object
 *                     description: Information about the applicant.
 *                     properties:
 *                       user:
 *                         type: string
 *                         description: ID of the user associated with the applicant.
 *                       image:
 *                         type: object
 *                         properties:
 *                           secure_url:
 *                             type: string
 *                             description: URL of the applicant's image.
 *                           public_id:
 *                             type: string
 *                             description: Public ID of the applicant's image.
 *                       name:
 *                         type: string
 *                         description: Name of the applicant.
 *                       lastName:
 *                         type: string
 *                         description: Last name of the applicant.
 *                       phoneNumber:
 *                         type: string
 *                         description: Phone number of the applicant.
 *                       address:
 *                         type: string
 *                         description: Address of the applicant.
 *                       postalCode:
 *                         type: string
 *                         description: Postal code of the applicant's address.
 *                       province:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: ID of the province.
 *                           description:
 *                             type: string
 *                             description: Description of the province.
 *                         description: Province of the applicant.
 *                       cityRegion:
 *                         type: string
 *                         description: City or region of the applicant's address.
 *                       gender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: ID of the gender.
 *                           description:
 *                             type: string
 *                             description: Description of the gender.
 *                         description: Gender of the applicant.
 *                       birthDate:
 *                         type: string
 *                         format: date
 *                         description: Birth date of the applicant.
 *                       birthPlace:
 *                         type: string
 *                         description: Birth place of the applicant.
 *                       nationality:
 *                         type: string
 *                         description: Nationality of the applicant.
 *                       maritalStatus:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: ID of the marital status.
 *                           description:
 *                             type: string
 *                             description: Description of the marital status.
 *                         description: Marital status of the applicant.
 *                       linkedIn:
 *                         type: string
 *                         description: LinkedIn profile of the applicant.
 *                       webSite:
 *                         type: string
 *                         description: Website of the applicant.
 *                   workExperiences:
 *                     type: array
 *                     description: List of work experiences of the applicant.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the work experience.
 *                         description:
 *                           type: string
 *                           description: Description of the work experience.
 *                   educations:
 *                     type: array
 *                     description: List of educations of the applicant.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the education.
 *                         description:
 *                           type: string
 *                           description: Description of the education.
 *                   languages:
 *                     type: array
 *                     description: List of languages of the applicant.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the language.
 *                         description:
 *                           type: string
 *                           description: Description of the language.
 *       '400':
 *         description: Bad request. The request was invalid.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. No applicants found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /admin/get-users:
 *  get:
 *    summary: Get users with pagination.
 *    description: Retrieve users with pagination based on the provided search parameters.
 *    tags:
 *      - Admin
 *    parameters:
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
 *         description: Por ejemplo {"userType":"COMPANY"}
 *         additionalProperties:
 *           type: string
 *         style: form
 *         explode: true
 *    security:
 *      - customToken: []
 *    responses:
 *      '200':
 *        description: Users retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                totalDocs:
 *                  type: integer
 *                  description: Total number of documents matching the query.
 *                limit:
 *                  type: integer
 *                  description: Maximum number of documents per page.
 *                totalPages:
 *                  type: integer
 *                  description: Total number of pages.
 *                page:
 *                  type: integer
 *                  description: Current page number.
 *                pagingCounter:
 *                  type: integer
 *                  description: Number of documents skipped for pagination.
 *                hasPrevPage:
 *                  type: boolean
 *                  description: Indicates if there is a previous page.
 *                hasNextPage:
 *                  type: boolean
 *                  description: Indicates if there is a next page.
 *                prevPage:
 *                  type: integer
 *                  description: Previous page number.
 *                nextPage:
 *                  type: integer
 *                  description: Next page number.
 *                docs:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 *                        description: The username of the user.
 *                      email:
 *                        type: string
 *                        description: The email address of the user.
 *                      password:
 *                        type: string
 *                        description: The password of the user.
 *                      code:
 *                        type: string
 *                        description: The code associated with the user.
 *                      status:
 *                        type: string
 *                        enum:
 *                          - UNVERIFIED
 *                          - VERIFIED
 *                          - SUSPENDED
 *                        description: The status of the user account.
 *                      userType:
 *                        type: string
 *                        enum:
 *                          - APPLICANT
 *                          - COMPANY
 *                          - ADMIN
 *                        description: The type of the user.
 *      '400':
 *        description: Bad request. The provided parameters are invalid.
 *      '401':
 *        description: Unauthorized. User is not authenticated.
 *      '500':
 *        description: Internal server error. An unexpected error occurred.
 * /admin/get-jobs:
 *   get:
 *     summary: Get jobs with pagination and company details.
 *     description: Retrieve jobs with pagination, including details about the associated company.
 *     tags:
 *       - Admin
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
 *         description: Por ejemplo {"title":"Verdulero"}
 *         additionalProperties:
 *           type: string
 *         style: form
 *         explode: true
 *     responses:
 *       '200':
 *         description: Jobs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDocs:
 *                   type: integer
 *                   description: Total number of documents matching the query.
 *                 limit:
 *                   type: integer
 *                   description: Maximum number of documents per page.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 page:
 *                   type: integer
 *                   description: Current page number.
 *                 pagingCounter:
 *                   type: integer
 *                   description: Number of documents skipped for pagination.
 *                 hasPrevPage:
 *                   type: boolean
 *                   description: Indicates if there is a previous page.
 *                 hasNextPage:
 *                   type: boolean
 *                   description: Indicates if there is a next page.
 *                 prevPage:
 *                   type: integer
 *                   description: Previous page number.
 *                 nextPage:
 *                   type: integer
 *                   description: Next page number.
 *                 docs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the job.
 *                       company:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The unique identifier for the company.
 *                           businessName:
 *                             type: string
 *                             description: The business name of the company.
 *                           description:
 *                             type: string
 *                             description: The description of the company.
 *                           image:
 *                             type: object
 *                             properties:
 *                               secure_url:
 *                                 type: string
 *                                 description: URL of the company's image.
 *                               public_id:
 *                                 type: string
 *                                 description: Public ID of the company's image.
 *                       title:
 *                         type: string
 *                         description: The title of the job.
 *                       description:
 *                         type: string
 *                         description: The description of the job.
 *                       duration:
 *                         type: number
 *                         description: The duration of the job.
 *                       creationDate:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the job.
 *                       updateDate:
 *                         type: string
 *                         format: date-time
 *                         description: The update date of the job.
 *                       status:
 *                         type: string
 *                         enum:
 *                           - ACTIVE
 *                           - INACTIVE
 *                           - PAUSED
 *                           - DELETED
 *                         description: The status of the job.
 *       '400':
 *         description: Bad request. The provided parameters are invalid.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
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
router.get(
  '/get-cvs',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AdminController.getCVs
)

router.get(
  '/get-users',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AdminController.getUsers
)

router.get(
  '/get-jobs',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AdminController.getJobs
)

export default router
