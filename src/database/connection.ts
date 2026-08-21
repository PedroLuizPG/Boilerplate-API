import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

// const connectionString = `${process.env.DATABASE_URL}`
// const adapter = new PrismaPg({ connectionString })
// const prisma = new PrismaClient({ adapter })

// export { prisma }

class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = `${process.env.DATABASE_URL}`
    const adapter = new PrismaPg({ connectionString })
    super({ adapter })
  }
}


export const prisma = new PrismaService()