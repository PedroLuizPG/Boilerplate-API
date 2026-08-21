// import { db } from '@/database/connection.js'
// import type {
//   CreateTaskInput,
//   // CrateTaskInput,
//   Task,
//   TaskRepository,
//   UpdateTaskInput
// } from './task.entity.js'
// import { AppError } from '@/shared/errors/app-error.js'

// type TaskRow = {
//   id: number
//   title: string
//   done: number
//   created_at: string
// }

// function toTask(row: TaskRow): Task {
//   return {
//     id: row.id,
//     title: row.title,
//     done: Boolean(row.done),
//     created_at: new Date(row.created_at + 'Z').toISOString()
//     // created_at: row.created_at
//   }
// }

// export class SqliteTaskRepository implements TaskRepository {
//   // async aqui é só pra bater com o contrato da interface — por dentro,
//   // o better-sqlite3 continua rodando tudo de forma síncrona e instantânea.
//   async findAll(): Promise<Task[]> {
//     const rows = (await db
//       .prepare('SELECT * FROM tasks ORDER BY id DESC')
//       .all()) as TaskRow[]
//     return rows.map(toTask)
//   }

//   async findById(id: number): Promise<Task | null> {
//     const row = (await db
//       .prepare(' SELECT * FROM tasks WHERE id = ?')
//       .get(id)) as TaskRow | undefined
//     return row ? toTask(row) : null
//   }

//   async create(data: CreateTaskInput): Promise<Task> {
//     try {
//       const result = db
//         .prepare('INSERT INTO tasks (title) VALUES (?) ')
//         .run(data.title)
//       return (await this.findById(Number(result.lastInsertRowid)))!
//     } catch (err: any) {
//       console.log(err)
//       // Traduz um erro técnico do SQLite em um erro de domínio (AppError),
//       // que o error handler global (seção 9) já sabe transformar em resposta HTTP.
//       if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
//         throw new AppError('Já existe uma task com esse título', 409)
//       }
//       throw err // erro inesperado: sobe cru pro handler global (vira 500)
//     }
//   }

//   async update(id: number, data: UpdateTaskInput): Promise<Task | null> {
//     const current = await this.findById(id)
//     if (!current) {
//       return null
//     }
//     const title = data.title ?? current.title
//     const done = data.done ?? current.done
//     try {
//       db.prepare('UPDATE tasks  SET title = ?, done = ? WHERE id = ?').run(
//         title,
//         done ? 1 : 0,
//         id
//       )
//     } catch (err: any) {
//       if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
//         throw new AppError('Title already exists', 409)
//       }
//       throw err
//     }
//     return await this.findById(id)
//   }

//   async delete(id: number): Promise<boolean> {
//     try {
//       const result = db.prepare('DELETE FROM tasks where id = ?').run(id)
//       return result.changes > 0
//     } catch (err: any) {
//       console.log(err)
//       throw err
//     }
//   }
// }
