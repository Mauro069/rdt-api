/**
 *  @swagger
 * tags:
 *   name: Contacts
 *   description: Endpoint relacionado con contacto
 */

/**
 * @swagger
 * /contacts/send:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Send contact information
 *     description: Endpoint to send contact information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Contact information sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Validation error details
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *                   description: Error details
 */

import { Router } from 'express'
import { ContactController } from '../controllers/contact'

const router = Router()

router.post('/send', ContactController.send)

export default router
