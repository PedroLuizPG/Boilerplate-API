import type { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: { title: 'My API', version: '1.0.0' }
    },
    transform: jsonSchemaTransform
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs'
  })
}
