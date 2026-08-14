import fastify from 'fastify'
import { z } from 'zod'
import { env } from './config/env.js'

export async function buildApp() {
  const app = fastify({ logger: true })
  app.get('/health', async () => {
    return { status: 'ok' }
  })

  return app
}
