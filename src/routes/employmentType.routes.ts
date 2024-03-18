/**
 *  @swagger
 * tags:
 *   name: Employment Type
 *   description: Endpoints relacionados con el tipo de empleo
 */

/**
 * @swagger
 * /employment-type:
 *   get:
 *     tags:
 *       - Employment Type
 *     summary: Get all employment types
 *     description: Retrieve a list of all employment types.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of employment types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the employment type.
 *                   description:
 *                     type: string
 *                     description: The description of the employment type.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /employment-type/create:
 *   post:
 *     tags:
 *       - Employment Type
 *     summary: Create a new employment type
 *     description: Create a new employment type.
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
 *         description: Successfully created employment type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the employment type.
 *                 description:
 *                   type: string
 *                   description: The description of the employment type.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /employment-type/update/{id}:
 *   put:
 *     tags:
 *       - Employment Type
 *     summary: Update an employment type
 *     description: Update details of a specific employment type.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employment type to update
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
 *         description: Successfully updated employment type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the employment type.
 *                 description:
 *                   type: string
 *                   description: The description of the employment type.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Employment type not found.
 *       '500':
 *         description: Internal server error - Generic error.
 * /employment-type/delete/{id}:
 *   delete:
 *     tags:
 *       - Employment Type
 *     summary: Delete an employment type
 *     description: Delete a specific employment type.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employment type to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted employment type.
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
 *         description: Not Found - Employment type not found.
 *       '500':
 *         description: Internal server error - Generic error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { EmploymentTypeController } from '../controllers/employmentType'

const router = Router()

router.get('/', [authMiddleware], EmploymentTypeController.getAll)
router.post(
  '/create',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  EmploymentTypeController.create
)
router.put(
  '/update/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  EmploymentTypeController.update
)
router.delete(
  '/delete/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  EmploymentTypeController.deleteIt
)

export default router
