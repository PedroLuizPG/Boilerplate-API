import { describe, it, expect, beforeAll } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../src/app'

describe('Tasks routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await buildApp()
    await app.ready()
  })

  it('Should be able create task and return status code 201', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: { title: 'Task 1' }
    })

    expect(response.statusCode).toBe(201)
    expect(response.json()).toMatchObject({ title: 'Task 1', done: false })
  })

  it('Should be able to return status code 400 when the title is missing', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: { title: '' }
    })

    expect(response.statusCode).toBe(400)
  })

  it('should return status code 400 when the task does not exist', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/tasks/999999'
    })
    expect(response.statusCode).toBe(404)
  })

  it('Should be able to update task', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: '/tasks/1',
      payload: { title: 'task atualizada', done: true }
    })

    expect(response.json()).toMatchObject({
      title: 'task atualizada',
      done: true
    })
  })

  it('Should be able to delete task and return status code 204', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/tasks/1'
    })

    expect(response.statusCode).toBe(204)
  })
})
