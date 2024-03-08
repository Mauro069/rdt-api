/**
 * @swagger
 * /auth/register:
 *   post:
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
 *     responses:
 *       '201':
 *         description: Usuario administrador registrado exitosamente.
 * /auth/register-applicant:
 *   post:
 *     summary: Registro de solicitante
 *     description: Crea un nuevo solicitante.
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
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - name
 *               - lastName
 *     responses:
 *       '201':
 *         description: Solicitante registrado exitosamente.
 * /auth/register-company:
 *   post:
 *     summary: Registro de empresa
 *     description: Crea una nueva empresa.
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
 *               businessName:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - businessName
 *               - description
 *     responses:
 *       '201':
 *         description: Empresa registrada exitosamente.
 * /auth/login:
 *   post:
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
 */

import { Router } from 'express'
import { AuthController } from '../controllers/auth/index'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'

const router = Router()

router.post(
  '/register',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  AuthController.register
)
router.post('/register-applicant', AuthController.registerApplicant)
router.post('/register-company', AuthController.registerCompany)
router.post('/login', AuthController.login)
router.get('/confirm/:token', AuthController.confirm)

export default router
