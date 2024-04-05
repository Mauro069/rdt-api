/**
 *  @swagger
 * tags:
 *   name: Work Modality
 *   description: Endpoints relacionados con la modalidad de trabajo
 */

/**
 * @swagger
 * /work-modality:
 *   get:
 *     tags:
 *       - Work Modality
 *     summary: Get all work modalities
 *     description: Retrieve a list of all work modalities.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of work modalities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the work modality.
 *                   description:
 *                     type: string
 *                     description: The description of the work modality.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /work-modality/create:
 *   post:
 *     tags:
 *       - Work Modality
 *     summary: Create a new work modality
 *     description: Create a new work modality.
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
 *         description: Successfully created work modality.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the work modality.
 *                 description:
 *                   type: string
 *                   description: The description of the work modality.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /work-modality/update/{id}:
 *   put:
 *     tags:
 *       - Work Modality
 *     summary: Update a work modality
 *     description: Update details of a specific work modality.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the work modality to update
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
 *         description: Successfully updated work modality.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the work modality.
 *                 description:
 *                   type: string
 *                   description: The description of the work modality.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Work modality not found.
 *       '500':
 *         description: Internal server error - Generic error.
 * /work-modality/delete/{id}:
 *   delete:
 *     tags:
 *       - Work Modality
 *     summary: Delete a work modality
 *     description: Delete a specific work modality.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the work modality to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted work modality.
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
 *         description: Not Found - Work modality not found.
 *       '500':
 *         description: Internal server error - Generic error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { WorkModalityController } from '../controllers/workModality'

const router = Router()

router.get('/', [authMiddleware], WorkModalityController.getAll)
router.post(
  '/create',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  WorkModalityController.create
)
router.put(
  '/update/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  WorkModalityController.update
)
router.delete(
  '/delete/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  WorkModalityController.deleteIt
)

export default router
