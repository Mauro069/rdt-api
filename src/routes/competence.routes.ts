/**
 *  @swagger
 * tags:
 *   name: Competence
 *   description: Endpoints relacionados con las competencias
 */

/**
 * @swagger
 * /competence:
 *   get:
 *     tags:
 *       - Competence
 *     summary: Get all competences
 *     description: Retrieve a list of all competences.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of competences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the competence.
 *                   description:
 *                     type: string
 *                     description: The description of the competence.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /competence/create:
 *   post:
 *     tags:
 *       - Competence
 *     summary: Create a new competence
 *     description: Create a new competence.
 *     security:
 *       - customToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *             required:
 *               - description
 *     responses:
 *       '201':
 *         description: Successfully created competence.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the competence.
 *                 description:
 *                   type: string
 *                   description: The description of the competence.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /competence/update/{id}:
 *   put:
 *     tags:
 *       - Competence
 *     summary: Update a competence
 *     description: Update details of a specific competence.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the competence to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *             required:
 *               - description
 *     responses:
 *       '200':
 *         description: Successfully updated competence.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the competence.
 *                 description:
 *                   type: string
 *                   description: The description of the competence.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Competence not found.
 *       '500':
 *         description: Internal server error - Generic error.
 * /competence/delete/{id}:
 *   delete:
 *     tags:
 *       - Competence
 *     summary: Delete a competence
 *     description: Delete a specific competence.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the competence to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted competence.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Competence not found.
 *       '500':
 *         description: Internal server error - Generic error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { CompetenceController } from '../controllers/competence'

const router = Router()

router.get('/', [authMiddleware], CompetenceController.getAll)
router.post(
  '/create',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  CompetenceController.create
)
router.put(
  '/update/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  CompetenceController.update
)
router.delete(
  '/delete/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  CompetenceController.deleteIt
)

export default router
