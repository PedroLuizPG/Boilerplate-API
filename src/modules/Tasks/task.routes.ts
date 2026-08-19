import type { FastifyInstance } from 'fastify'
// import { SqliteTaskRepository } from './task.repository.js'
import { TaskService } from './task.service.js'
import { TaskController } from './task.controller.js'
import {
  createTaskSchema,
  updateTaskSchema,
  taskParamsSchema,
  taskResponseSchema
} from './task.schema.js'
import { PostgresTaskRepository } from './task.repository.postgres.js'

export async function taskRoutes(app: FastifyInstance) {
  // "Composition root": aqui é o único lugar onde as camadas são conectadas.

  const repository = new PostgresTaskRepository()
  const service = new TaskService(repository)
  const controller = new TaskController(service)

  app.get('/', {
    schema: { response: { 200: taskResponseSchema.array() }, tags: ['tasks'] },
    handler: controller.findAll
  })

  app.get('/:id', {
    schema: {
      params: taskParamsSchema,
      response: { 200: taskResponseSchema },
      tags: ['tasks']
    },
    handler: controller.findById
  })

  app.post('/', {
    schema: {
      body: createTaskSchema,
      response: { 201: taskResponseSchema },
      tags: ['tasks']
    },
    handler: controller.create
  })

  app.put('/:id', {
    schema: {
      params: taskParamsSchema,
      body: updateTaskSchema,
      response: { 200: taskResponseSchema },
      tags: ['tasks']
    },
    handler: controller.update
  })

  app.delete('/:id', {
    schema: {
      params: taskParamsSchema,
      tags: ['tasks']
    },
    handler: controller.delete
  })
}
