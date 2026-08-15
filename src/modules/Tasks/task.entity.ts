export interface Task {
  id: number
  title: string
  done: boolean
  created_at: string
}

export interface CrateTaskInput {
  title: string
}

export interface UpdateTaskInput {
  title?: string
  done?: boolean
}

// Interface que o Service depende — não a implementação concreta.
// Isso é o que permite trocar SQLite/Postgres/Prisma sem mexer no Service.
export interface TaskRepository {
  findAll(): Task[]
  findById(id: number): Task | null
  create(data: CrateTaskInput): Task
  update(id: number, data: UpdateTaskInput): Task | null
  delete(id: number): boolean
}
