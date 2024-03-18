/**
 *  @swagger
 * tags:
 *   name: Provinces
 *   description: Endpoints relacionados con las provincias
 */

/**
 * @swagger
 * /provinces:
 *   get:
 *     tags:
 *       - Provinces
 *     summary: Get all provinces
 *     description: Retrieve a list of all provinces.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of provinces.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the province.
 *                   description:
 *                     type: string
 *                     description: The description of the province.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /provinces/create:
 *   post:
 *     tags:
 *       - Provinces
 *     summary: Create a new province
 *     description: Create a new province.
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
 *         description: Successfully created province.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the province.
 *                 description:
 *                   type: string
 *                   description: The description of the province.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /provinces/update/{id}:
 *   put:
 *     tags:
 *       - Provinces
 *     summary: Update a province
 *     description: Update details of a specific province.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the province to update
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
 *         description: Successfully updated province.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the province.
 *                 description:
 *                   type: string
 *                   description: The description of the province.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Province not found.
 *       '500':
 *         description: Internal server error - Generic error.
 * /provinces/delete/{id}:
 *   delete:
 *     tags:
 *       - Provinces
 *     summary: Delete a province
 *     description: Delete a specific province.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the province to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted province.
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
 *         description: Not Found - Province not found.
 *       '500':
 *         description: Internal server error - Generic error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { ProvinceController } from '../controllers/province'

const router = Router()

router.get('/', [authMiddleware], ProvinceController.getAll)
router.post(
  '/create',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  ProvinceController.create
)
router.put(
  '/update/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  ProvinceController.update
)
router.delete(
  '/delete/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  ProvinceController.deleteIt
)

export default router
