import { describe, it, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoListStore } from '../useTodoListStore'
import { createTodosStorage } from '../../services/storage/todosStorage'

// Mock the todosStorage
vi.mock('../../services/storage/todosStorage', () => ({
  createTodosStorage: vi.fn()
}))

describe('useTodoListStore', () => {
  let store
  let mockStorage

  beforeEach(() => {
    // Create a new pinia instance
    setActivePinia(createPinia())

    // Setup mock storage
    mockStorage = {
      save: vi.fn(),
      load: vi.fn(),
      clear: vi.fn()
    }
    createTodosStorage.mockReturnValue(mockStorage)

    // Create store instance
    store = useTodoListStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have empty todos array', () => {
      expect(store.todos).toEqual([])
    })
  })

  describe('getNextId', () => {
    it('should generate next ID correctly', () => {
      const todos = [
        { id: 1, text: 'Test Todo 1', completed: false },
        { id: 3, text: 'Test Todo 2', completed: true }
      ]
      const nextId = store.getNextId(todos)
      expect(nextId).toBe(4)
    })

    it('should return 1 for empty todos', () => {
      const nextId = store.getNextId([])
      expect(nextId).toBe(1)
    })
  })

  describe('initialize', () => {
    it('should load todos from storage', async () => {
      const mockTodos = [
        { id: 1, text: 'Test Todo 1', completed: false },
        { id: 2, text: 'Test Todo 2', completed: true }
      ]
      mockStorage.load.mockResolvedValue(mockTodos)

      await store.initialize()
      expect(store.todos).toEqual(mockTodos)
      expect(mockStorage.load).toHaveBeenCalled()
    })

    it('should handle load errors gracefully', async () => {
      mockStorage.load.mockRejectedValue(new Error('Load failed'))
      await store.initialize()
      expect(store.todos).toEqual([])
    })
  })

  describe('addTodo', () => {
    it('should add a new todo', async () => {
      const text = 'New Todo'
      mockStorage.save.mockResolvedValue()

      await store.addTodo(text)
      expect(store.todos).toHaveLength(1)
      expect(store.todos[0].text).toBe(text)
      expect(store.todos[0].completed).toBe(false)
      expect(mockStorage.save).toHaveBeenCalled()
    })

    it('should handle save errors gracefully', async () => {
      const text = 'New Todo'
      mockStorage.save.mockRejectedValue(new Error('Save failed'))

      await store.addTodo(text)
      expect(store.todos).toHaveLength(0)
    })
  })

  describe('toggleTodo', () => {
    beforeEach(async () => {
      // Setup initial todos
      const mockTodos = [{ id: 1, text: 'Test Todo', completed: false }]
      mockStorage.load.mockResolvedValue(mockTodos)
      await store.initialize()
    })

    it('should toggle todo completion status', async () => {
      mockStorage.save.mockResolvedValue()

      await store.toggleTodo(1)
      expect(store.todos[0].completed).toBe(true)
      expect(mockStorage.save).toHaveBeenCalled()
    })

    it('should not toggle non-existent todo', async () => {
      await store.toggleTodo(999)
      expect(mockStorage.save).not.toHaveBeenCalled()
    })
  })

  describe('deleteTodo', () => {
    beforeEach(async () => {
      // Setup initial todos
      const mockTodos = [{ id: 1, text: 'Test Todo', completed: false }]
      mockStorage.load.mockResolvedValue(mockTodos)
      await store.initialize()
    })

    it('should delete a todo', async () => {
      mockStorage.save.mockResolvedValue()

      await store.deleteTodo(1)
      expect(store.todos).toHaveLength(0)
      expect(mockStorage.save).toHaveBeenCalled()
    })

    it('should not delete non-existent todo', async () => {
      await store.deleteTodo(999)
      expect(mockStorage.save).not.toHaveBeenCalled()
    })
  })

  describe('clearTodos', () => {
    let initialTodos

    beforeEach(async () => {
      // Setup initial todos
      initialTodos = [
        { id: 1, text: 'Test Todo 1', completed: false },
        { id: 2, text: 'Test Todo 2', completed: true }
      ]
      mockStorage.load.mockResolvedValue(initialTodos)
      await store.initialize()
    })

    it('should clear all todos', async () => {
      mockStorage.clear.mockResolvedValue()

      await store.clearTodos()
      expect(store.todos).toHaveLength(0)
      expect(mockStorage.clear).toHaveBeenCalled()
    })

    it('should not clear todos when storage operation fails', async () => {
      mockStorage.clear.mockRejectedValue(new Error('Clear failed'))

      await store.clearTodos()
      expect(store.todos).toEqual(initialTodos)
      expect(mockStorage.clear).toHaveBeenCalled()
    })
  })
})
