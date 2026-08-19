import { pool } from '../../database/connection.js'
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskRepository
} from './task.entity.js'

type TaskRow = {
  id: number
  title: string
  done: boolean
  created_at: string
}

function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    done: row.done,
    created_at: new Date(row.created_at + 'Z').toISOString()
    // created_at: row.created_at
  }
}

export class PostgresTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id DESC')

    return rows.map(toTask)
  }

  async findById(id: number): Promise<Task | null> {
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])

    console.log(rows[0])
    return rows[0] ? toTask(rows[0]) : null
  }

  async create(data: CreateTaskInput): Promise<Task> {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [data.title]
    )

    return toTask(rows[0])
  }

  async update(id: number, data: UpdateTaskInput): Promise<Task | null> {
    const current = await this.findById(id)
    if (!current) return null
    const { rows } = await pool.query(
      'UPDATE tasks set title = $1, done = $2 WHERE id = $3 RETURNING *',
      [data.title ?? current.title, data.done ?? current.done, id]
    )

    return toTask(rows[0])
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id])

    return (result.rowCount ?? 0) > 0
  }
}
