import type { FastifyInstance } from 'fastify'
import { SqliteTaskRepository } from './task.repository.js'
import { TaskService } from './task.service.js'
import { TaskController } from './task.controller.js'
import {
  createTaskSchema,
  updateTaskSchema,
  taskParamsSchema,
  taskResponseSchema
} from './task.schema.js'

export async function taskRoutes(app: FastifyInstance) {
  // "Composition root": aqui é o único lugar onde as camadas são conectadas.

  const repository = new SqliteTaskRepository()
  const service = new TaskService(repository)
  const controller = new TaskController(service)

  app.get('/tasks', {
    schema: { response: { 200: taskResponseSchema.array() }, tags: ['tasks'] },
    handler: controller.findAll
  })

  app.get('/tasks/:id', {
    schema: {
      params: taskParamsSchema,
      response: { 200: taskResponseSchema },
      tags: ['tasks']
    },
    handler: controller.findById
  })

  app.post('/tasks', {
    schema: {
      body: createTaskSchema,
      response: { 201: taskResponseSchema },
      tags: ['tasks']
    },
    handler: controller.create
  })

  app.put('/tasks/:id', {
    schema: {
      params: taskParamsSchema,
      body: updateTaskSchema,
      response: { 200: taskResponseSchema },
      tags: ['tasks']
    },
    handler: controller.update
  })
}
