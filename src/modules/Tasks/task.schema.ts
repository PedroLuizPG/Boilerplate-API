import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255)
})

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  done: z.boolean().optional()
})

export const taskParamsSchema = z.object({
  id: z.coerce.number().int().positive()
})

export const taskResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.string()
})
