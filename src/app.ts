import fastify from 'fastify'
import { z } from 'zod'
import { env } from './config/env.js'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { registerSwagger } from './plugins/swagger.js'
import { registerRoutes } from './routes.js'
import { AppError } from './shared/errors/app-error.js'

export async function buildApp() {
  const app = fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'error' : 'info'
    }
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await registerSwagger(app)

  app.register(registerRoutes)

  // app.get('/health', async () => {
  //   return { status: 'ok' }
  // })

  // Error handler centralizado: aqui e só aqui tratamos os erros.
  app.setErrorHandler((error: any, _req, res) => {
    // Erro de validação do Fastify com Zod
    if (error.code === 'FST_ERR_VALIDATION') {
      return res.status(400).send({
        message: 'Validation error',
        issues: error.validation
      })
    }

    if (error instanceof z.ZodError) {
      return res.status(400).send({
        message: 'Validation error',
        issues: error.issues
      })
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message })
    }

    // Fallback para qualquer erro com statusCode definido
    if (error.statusCode && error.statusCode >= 400) {
      return res.status(error.statusCode).send({
        message: error.message || 'Error'
      })
    }

    if (env.NODE_ENV !== 'production') {
      console.error('Unhandled error:', error)
    } else {
      //Aqui você pode adicionar uma ferramenta de monitoramento de erros, como Sentry/Datadog/New Relic, para registrar os erros em produção
    }

    return res.status(500).send({
      message: 'Internal server error'
    })
  })

  return app
}
