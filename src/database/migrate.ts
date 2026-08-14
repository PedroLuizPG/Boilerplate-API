import fs from 'node:fs'
import path from 'node:path'
import { db } from './connection.js'

const migrationsDir = path.resolve('src/database/migrations')
const files = fs.readdirSync(migrationsDir).sort()

for (const file of files) {
  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8')
  db.exec(sql)
}

console.log(`✔${files.length} migração(ões) aplicada(s)`)
