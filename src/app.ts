import fastify from 'fastify'
import { z } from 'zod'
import { env } from './config/env.js'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { registerSwagger } from './plugins/swagger.js'
import { taskRoutes } from './modules/Tasks/task.routes.js'

export async function buildApp() {
  const app = fastify({ logger: false }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await registerSwagger(app)

  app.register(taskRoutes)

  // app.get('/health', async () => {
  //   return { status: 'ok' }
  // })

  app.setErrorHandler((error, _req, res) => {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        message: 'Validation error',
        issues: z.treeifyError(error)
      })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      //Aqui você pode adicionar uma ferramenta de monitoramento de erros, como Sentry/Datadog/New Relic, para registrar os erros em produção
    }
    res.status(500).send({
      message: 'Internal server error'
    })
  })

  return app
}
