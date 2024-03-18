/**
 *  @swagger
 * tags:
 *   name: Gender
 *   description: Endpoints relacionados con el género
 */

/**
 * @swagger
 * /gender:
 *   get:
 *     tags:
 *       - Gender
 *     summary: Get all genders
 *     description: Retrieve a list of all genders.
 *     security:
 *       - customToken: []
 *     responses:
 *       '200':
 *         description: A list of genders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the gender.
 *                   description:
 *                     type: string
 *                     description: The description of the gender.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /gender/create:
 *   post:
 *     tags:
 *       - Gender
 *     summary: Create a new gender
 *     description: Create a new gender.
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
 *         description: Successfully created gender.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the gender.
 *                 description:
 *                   type: string
 *                   description: The description of the gender.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '500':
 *         description: Internal server error - Generic error.
 * /gender/update/{id}:
 *   put:
 *     tags:
 *       - Gender
 *     summary: Update a gender
 *     description: Update details of a specific gender.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the gender to update
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
 *         description: Successfully updated gender.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the gender.
 *                 description:
 *                   type: string
 *                   description: The description of the gender.
 *       '401':
 *         description: Unauthorized - User authentication failed.
 *       '404':
 *         description: Not Found - Gender not found.
 *       '500':
 *         description: Internal server error - Generic error.
 * /gender/delete/{id}:
 *   delete:
 *     tags:
 *       - Gender
 *     summary: Delete a gender
 *     description: Delete a specific gender.
 *     security:
 *       - customToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the gender to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted gender.
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
 *         description: Not Found - Gender not found.
 *       '500':
 *         description: Internal server error - Generic error.
 */

import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { userTypeMiddleware } from '../middlewares/userType'
import { userType } from '../utils/constants'
import { GenderController } from '../controllers/gender'

const router = Router()

router.get('/', [authMiddleware], GenderController.getAll)
router.post(
  '/create',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  GenderController.create
)
router.put(
  '/update/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  GenderController.update
)
router.delete(
  '/delete/:id',
  [authMiddleware, userTypeMiddleware(userType.ADMIN)],
  GenderController.deleteIt
)

export default router
