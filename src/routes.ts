import type { FastifyInstance } from 'fastify'
import { taskRoutes } from './modules/Tasks/task.routes.js'

export async function registerRoutes(app: FastifyInstance) {
  app.register(taskRoutes,{prefix: "/tasks"})

  // conforme os módulos forem crescendo, é só ir adicionando aqui:
  // app.register(userRoutes, { prefix: "/users" });
  // app.register(orderRoutes, { prefix: "/orders" });
  // app.register(authRoutes, { prefix: "/auth" });
}
