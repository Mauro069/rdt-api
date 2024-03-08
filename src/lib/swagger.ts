import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import path from 'path'

const options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'RDT Express API with Swagger',
      version: '0.1.0',
      description: 'Red de Trabajo API (RDT-API) documentada con Swagger',
      contact: {
        name: 'Pablo Pedraza',
        url: 'https://porfolio-pedraza-simple.vercel.app/',
        email: 'pabloj.pedraza@gmail.com',
      },
    },
    components: {
      securitySchemes: {
        customToken: { // Nombre del esquema de seguridad personalizado
          type: 'apiKey', // Tipo de esquema de seguridad (apiKey)
          in: 'header', // Indica que el token se enviará en el encabezado
          name: 'authorization', // Nombre del parámetro que contendrá el token
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['**/*.ts'],
}

const specs = swaggerJsdoc(options)

export function setupSwaggerDocs(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
