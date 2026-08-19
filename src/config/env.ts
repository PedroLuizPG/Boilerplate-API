import 'dotenv/config'
// import dotenv from 'dotenv'
import { z } from 'zod'

// Carrega .env.test quando NODE_ENV=test, senão o .env normal
// dotenv.config({
//   path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
// })

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1)
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  const errors = z.treeifyError(_env.error)
  console.error('❌ invalid envroment variables!', errors)
  throw new Error('❌ invalid envroment variables!')
}

export const env = _env.data
