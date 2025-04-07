import { createStorage } from './index'

const TODOS_ENTITY = 'todos'

class TodosStorage {
  constructor() {
    this.storage = createStorage(TODOS_ENTITY)
  }

  async save(todos) {
    return this.storage.save(todos)
  }

  async load() {
    return this.storage.load()
  }

  async clear() {
    return this.storage.clear()
  }
}

export const createTodosStorage = () => new TodosStorage()
