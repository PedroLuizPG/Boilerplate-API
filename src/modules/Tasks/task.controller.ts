import type { FastifyRequest, FastifyReply } from 'fastify'
import type { TaskService } from './task.service.js'
import {
  createTaskSchema,
  updateTaskSchema,
  taskParamsSchema
} from './task.schema.js'

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  findAll = async (_req: FastifyRequest, res: FastifyReply) => {
    const tasks = await this.taskService.findAll()
    return res.status(200).send(tasks)
  }

  findById = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = taskParamsSchema.parse(req.params)
    const task = await this.taskService.findById(id)

    return res.send(task)
  }

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const body = createTaskSchema.parse(req.body)
    const task = await this.taskService.create(body)
    return res.status(201).send(task)
  }

  update = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = taskParamsSchema.parse(req.params)
    const body = updateTaskSchema.parse(req.body)

    const task = await this.taskService.update(id, body)
    return res.status(200).send(task)
  }

  delete = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = taskParamsSchema.parse(req.params)
    await this.taskService.delete(id)

    return res.status(204).send()
  }
}
