export interface Task {
  id: number
  title: string
  done: boolean
  created_at: string
}

export interface CreateTaskInput {
  title: string
}

export interface UpdateTaskInput {
  title?: string
  done?: boolean
}

// Interface que o Service depende — não a implementação concreta.
// Isso é o que permite trocar SQLite/Postgres/Prisma sem mexer no Service.
// Métodos assíncronos por CONTRATO, não porque o SQLite precise disso
// (leia a explicação logo abaixo, antes do Repository) — é o que garante
// que essa interface sirva pra qualquer banco, sem o Service precisar mudar

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(data: CreateTaskInput): Promise<Task>;
  update(id: number, data: UpdateTaskInput): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}
