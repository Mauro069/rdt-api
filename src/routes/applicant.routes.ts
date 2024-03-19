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
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the applicant.
 *               address:
 *                 type: string
 *                 description: The address of the applicant.
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the applicant.
 *               province:
 *                 type: string
 *                 description: The province of the applicant.
 *               cityRegion:
 *                 type: string
 *                 description: The city or region of the applicant.
 *               gender:
 *                 type: string
 *                 description: The gender of the applicant.
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The birth date of the applicant in ISO 8601 format (YYYY-MM-DD).
 *               birthPlace:
 *                 type: string
 *                 description: The birth place of the applicant.
 *               nationality:
 *                 type: string
 *                 description: The nationality of the applicant.
 *               maritalStatus:
 *                 type: string
 *                 description: The marital status of the applicant.
 *               linkedIn:
 *                 type: string
 *                 description: The LinkedIn profile of the applicant.
 *               webSite:
 *                 type: string
 *                 description: The website of the applicant.
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
 * /applicants/add-education:
 *   post:
 *     summary: Add education details for an applicant.
 *     description: Add education details including institution, degree, start date, end date, and description for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *                 description: The name of the institution.
 *               degree:
 *                 type: string
 *                 description: The degree obtained.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of education (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of education (optional).
 *               description:
 *                 type: string
 *                 description: Description of the education (optional).
 *                 maxLength: 2000
 *     responses:
 *       '201':
 *         description: Education details added successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/add-education/{educationId}:
 *   put:
 *     summary: Update education details for an applicant.
 *     description: Update education details including institution, degree, start date, end date, and description for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: ID of the education record to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *                 description: The name of the institution.
 *               degree:
 *                 type: string
 *                 description: The degree obtained.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of education (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of education (optional).
 *               description:
 *                 type: string
 *                 description: Description of the education (optional).
 *                 maxLength: 2000
 *     responses:
 *       '201':
 *         description: Education details updated successfully.
 *       '400':
 *         description: Bad request. The request body does not conform to the expected schema.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '404':
 *         description: Not found. Applicant or education not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-education:
 *   get:
 *     summary: Get education details for an applicant.
 *     description: Retrieve education details including institution, degree, start date, end date, and description for an applicant.
 *     tags:
 *       - Applicants
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Education details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 educations:
 *                   type: array
 *                   description: List of education records.
 *                   items:
 *                     type: object
 *                     properties:
 *                       institution:
 *                         type: string
 *                         description: The name of the institution.
 *                       degree:
 *                         type: string
 *                         description: The degree obtained.
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: The start date of education.
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: The end date of education.
 *                       description:
 *                         type: string
 *                         description: Description of the education.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 * /applicants/get-education/{educationId}:
 *   get:
 *     summary: Get education details by ID.
 *     description: Retrieve education details by its ID.
 *     tags:
 *       - Applicants
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: ID of the education record to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Education details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 institution:
 *                   type: string
 *                   description: The name of the institution.
 *                 degree:
 *                   type: string
 *                   description: The degree obtained.
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   description: The start date of education.
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: The end date of education.
 *                 description:
 *                   type: string
 *                   description: Description of the education.
 *       '404':
 *         description: Education not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the education was not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *
 * /applicants/delete-education/{educationId}:
 *   delete:
 *     summary: Delete education by ID.
 *     description: Delete education details by its ID.
 *     tags:
 *       - Applicants
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         description: ID of the education record to delete.
 *         schema:
 *           type: string
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Education deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the education was deleted.
 *       '404':
 *         description: Education not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the education was not found.
 *       '500':
 *         description: Internal server error. An unexpected error occurred.
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

router.get('/', [authMiddleware], ApplicantController.get)
router.post(
  '/add-education',
  [authMiddleware],
  ApplicantController.addEducation
)
router.put(
  '/add-education/:educationId',
  [authMiddleware],
  ApplicantController.updateEducation
)
router.get(
  '/get-education',
  [authMiddleware],
  ApplicantController.getEducations
)
router.get(
  '/get-education/:educationId',
  [authMiddleware],
  ApplicantController.getEducation
)
router.delete(
  '/delete-education/:educationId',
  [authMiddleware],
  ApplicantController.deleteEducation
)

export default router
