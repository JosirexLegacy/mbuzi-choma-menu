// lib/db.ts
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = process.env.TURSO_DATABASE_URL
  ? new PrismaLibSQL({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : undefined

export const db = globalForPrisma.prisma ?? (adapter
  ? new PrismaClient({ adapter })
  : new PrismaClient())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db