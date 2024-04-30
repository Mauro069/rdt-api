/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints relacionados con la autenticación de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Registro de usuario administrador
 *     description: Crea un nuevo usuario administrador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Admin registrad exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el registro fue exitoso.
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '400':
 *         description: Error de validación en los datos del usuario.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/register-applicant:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Registro de solicitante
 *     description: Crea un nuevo solicitante.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the applicant.
 *             required:
 *               - username
 *               - email
 *               - password
 *               - name
 *               - lastName
 *     responses:
 *       '201':
 *         description: Postulante registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el registro fue exitoso.
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '400':
 *         description: Error de validación en los datos del solicitante.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/register-company:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Registro de empresa
 *     description: Crea una nueva empresa.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               businessName:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the applicant.
 *             required:
 *               - username
 *               - email
 *               - password
 *               - businessName
 *               - description
 *     responses:
 *       '201':
 *         description: Empresa registrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si el registro fue exitoso.
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '400':
 *         description: Error de validación en los datos de la empresa.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Iniciar sesión
 *     description: Inicia sesión en la aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Sesión iniciada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Credenciales inválidas o usuario no verificado.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/confirm/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Confirmar registro
 *     description: Confirma el registro de usuario mediante un token enviado por correo electrónico.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de confirmación enviado por correo electrónico.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Registro confirmado correctamente.
 *       '401':
 *         description: Error al obtener o leer el token.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/change-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Cambiar contraseña
 *     description: Permite a un usuario cambiar su contraseña proporcionando la contraseña antigua y la nueva.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Contraseña antigua del usuario.
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmación de la nueva contraseña.
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *     security:
 *       - customToken: []
 *     responses:
 *       '201':
 *         description: Contraseña cambiada exitosamente.
 *       '400':
 *         description: Error en la solicitud debido a datos incorrectos.
 *       '401':
 *         description: No autorizado debido a credenciales inválidas o error de autenticación.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/verify-token:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verificar Token JWT es válido
 *     description: Verifica si el token JWT proporcionado es válido.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isValid:
 *                   type: boolean
 *                   description: Indica si el token es válido o no.
 *       '401':
 *         description: No autorizado debido a credenciales inválidas o error de autenticación.
 *       '500':
 *         description: Error interno del servidor.
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Solicitar restablecimiento de contraseña
 *     description: Permite a un usuario solicitar un restablecimiento de contraseña proporcionando su nombre de usuario o correo electrónico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userOrMail:
 *                 type: string
 *                 description: Nombre de usuario o correo electrónico del usuario.
 *     responses:
 *       '201':
 *         description: Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.
 *       '400':
 *         description: Error de validación en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                  type: string
 *       '401':
 *         description: No se encontró ningún usuario con el nombre de usuario o correo electrónico proporcionado.
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /auth/forgot-confirm:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Confirmar restablecimiento de contraseña
 *     description: Permite a un usuario confirmar el restablecimiento de su contraseña proporcionando su nombre de usuario, código de confirmación y nueva contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario.
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmación de la nueva contraseña.
 *               code:
 *                 type: string
 *                 description: Código de confirmación recibido por el usuario.
 *     responses:
 *       '201':
 *         description: Contraseña cambiada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Error de validación en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: Las contraseñas no coinciden.
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
 */

import { Router } from 'express'
import { AuthController } from '../controllers/auth/index'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { uploadMiddleware } from '../middlewares/upload'

const router = Router()

router.post(
  '/register',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AuthController.register
)
router.post(
  '/register-applicant',
  [uploadMiddleware],
  AuthController.registerApplicant
)
router.post(
  '/register-company',
  [uploadMiddleware],
  AuthController.registerCompany
)
router.post('/login', AuthController.login)
router.get('/confirm/:token', AuthController.confirm)
router.post('/change-password', [authMiddleware], AuthController.changePassword)
router.get('/verify-token', AuthController.verifyToken)
router.post('/forgot-password', AuthController.forgotPassword)
router.post('/forgot-confirm', AuthController.forgotConfirm)

export default router
