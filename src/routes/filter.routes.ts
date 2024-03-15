/**
 *  @swagger
 * tags:
 *   name: Filters
 *   description: Endpoints relacionados con los combos para la aplicación
 */

/**
 * @swagger
 * /filters/province:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Obtener provincias
 *     description: Retorna una lista de todas las provincias disponibles.
 *     responses:
 *       '200':
 *         description: Éxito al obtener las provincias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provinces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de la provincia.
 *                       description:
 *                         type: string
 *                         description: Descripción de la provincia.
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * /filters/competence:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Obtener competencias
 *     description: Retorna una lista de todas las competencias disponibles.
 *     responses:
 *       '200':
 *         description: Éxito al obtener las competencias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provinces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de la competencia.
 *                       description:
 *                         type: string
 *                         description: Descripción de la competencia.
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * /filters/employment-type:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Obtener los tipos de empleos
 *     description: Retorna una lista de todas los tipos de empleos disponibles.
 *     responses:
 *       '200':
 *         description: Éxito al obtener los tipos de empleos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provinces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de los tipos de empleos.
 *                       description:
 *                         type: string
 *                         description: Descripción de los tipos de empleos.
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * /filters/gender:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Obtener los tipos de géneros
 *     description: Retorna una lista de todas los tipos de géneros disponibles.
 *     responses:
 *       '200':
 *         description: Éxito al obtener los tipos de géneros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provinces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de los tipos de géneros.
 *                       description:
 *                         type: string
 *                         description: Descripción de los tipos de géneros.
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * /filters/marital-status:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Obtener los estados civiles
 *     description: Retorna una lista de todas los estados civiles disponibles.
 *     responses:
 *       '200':
 *         description: Éxito al obtener los estados civiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provinces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de los estados civiles.
 *                       description:
 *                         type: string
 *                         description: Descripción de los estados civiles.
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 * /filters/work-modality:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Obtener las modalidades de trabajo
 *     description: Retorna una lista de todas las modalidades de trabajo disponibles.
 *     responses:
 *       '200':
 *         description: Éxito al obtener las modalidades de trabajo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provinces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de las modalidades de trabajo.
 *                       description:
 *                         type: string
 *                         description: Descripción de las modalidades de trabajo.
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

import { Router } from 'express'
import { FilterController } from '../controllers/filter'

const router = Router()

router.get('/province', FilterController.getProvince)
router.get('/competence', FilterController.getCompetence)
router.get('/employment-type', FilterController.getEmploymentType)
router.get('/gender', FilterController.getGender)
router.get('/marital-status', FilterController.getMaritalStatus)
router.get('/work-modality', FilterController.getWorkModality)

export default router
