import { AppError } from '@/shared/errors/app-error.js'
import { prisma } from '../../database/connection.js'
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskRepository
} from './task.entity.js'

export class PrismaTaskRepository {
  constructor(private readonly db = prisma) {}

  async findAll(): Promise<Task[]> {
    return await this.db.tasks.findMany({
      orderBy: { id: 'desc' }
    })
  }

  async findById(id: number): Promise<Task | null> {
    return await this.db.tasks.findUnique({
      where: { id: id }
    })
  }

  async create(data: CreateTaskInput): Promise<Task> {
    try {
      return await this.db.tasks.create({ data })
    } catch (err) {
      console.log(err)
      throw new AppError('Error', 400)
    }
  }

  async update(id: number, data: UpdateTaskInput): Promise<Task | null> {
    try {
      return await this.db.tasks.update({
        where: { id },
        data
      })
    } catch (err) {
      console.log(err)
      throw new AppError('Error', 400)
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.db.tasks.delete({ where: { id: id } })
      return true
    } catch (err) {
      console.log(err)
      throw new AppError('Error', 400)
    }
  }
}
