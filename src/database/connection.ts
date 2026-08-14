import Database from 'better-sqlite3'
import { env } from '@/config/env.js'

export const db = new Database(env.DATABASE_URL)
db.pragma('journal_mode = WAL')
