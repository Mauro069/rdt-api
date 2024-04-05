/**
 *  @swagger
 * tags:
 *   name: Marital Status
 *   description: Endpoints relacionados con el estado civil
 */

/**
 * @swagger
 * /marital-status:
 *   get:
 *     tags:
 *       - Marital Status
 *     summary: Get all marital statuses
 *     description: Retrieve a list of all marital statuses.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of marital statuses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the marital status.
 *                   description:
 *                     type: string
 *                     description: The description of the marital status.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /marital-status/create:
 *   post:
 *     tags:
 *       - Marital Status
 *     summary: Create a new marital status
 *     description: Create a new marital status.
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
 *         description: Successfully created marital status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the marital status.
 *                 description:
 *                   type: string
 *                   description: The description of the marital status.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /marital-status/update/{id}:
 *   put:
 *     tags:
 *       - Marital Status
 *     summary: Update a marital status
 *     description: Update details of a specific marital status.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the marital status to update
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
 *         description: Successfully updated marital status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the marital status.
 *                 description:
 *                   type: string
 *                   description: The description of the marital status.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Marital status not found.
 *       '500':
 *         description: Internal server error - Generic error.
 * /marital-status/delete/{id}:
 *   delete:
 *     tags:
 *       - Marital Status
 *     summary: Delete a marital status
 *     description: Delete a specific marital status.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the marital status to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted marital status.
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
 *         description: Not Found - Marital status not found.
 *       '500':
 *         description: Internal server error - Generic error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { MaritalStatusController } from '../controllers/maritalStatus'

const router = Router()

router.get('/', [authMiddleware], MaritalStatusController.getAll)
router.post(
  '/create',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  MaritalStatusController.create
)
router.put(
  '/update/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  MaritalStatusController.update
)
router.delete(
  '/delete/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  MaritalStatusController.deleteIt
)

export default router
