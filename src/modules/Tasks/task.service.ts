import { AppError } from '@/shared/errors/app-error.js'
import type {
  TaskRepository,
  CreateTaskInput,
  UpdateTaskInput
} from './task.entity.js'
import { SqliteTaskRepository } from './task.repository.js'

export class TaskService {
  // Injeção de dependência via construtor — o Service não sabe
  // se o repository é SQLite, Postgres ou Prisma.
  constructor(private readonly taskRepository: SqliteTaskRepository) {}

  async findAll() {
    return await this.taskRepository.findAll()
  }

  async findById(id: number) {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new AppError('Task not found', 404)
    }

    return task
  }

  async create(data: CreateTaskInput) {
    return await this.taskRepository.create(data)
  }

  async update(id: number, data: UpdateTaskInput) {
    const task = await this.findById(id)
    if (!task) {
      throw new AppError('Task not found', 404)
    }
    return await this.taskRepository.update(id, data)
  }
}
