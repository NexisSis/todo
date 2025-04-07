import { describe, it, beforeEach, afterEach, vi } from 'vitest'
import { createTodosStorage } from '../todosStorage'
import { createStorage } from '../index'

vi.mock('../index', () => ({
  createStorage: vi.fn()
}))

describe('TodosStorage', () => {
  let todosStorage
  let mockStorage
  const testTodos = [
    { id: 1, text: 'Test Todo 1', completed: false },
    { id: 2, text: 'Test Todo 2', completed: true }
  ]

  beforeEach(() => {
    mockStorage = {
      save: vi.fn(),
      load: vi.fn(),
      clear: vi.fn()
    }
    createStorage.mockReturnValue(mockStorage)
    todosStorage = createTodosStorage()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('save', () => {
    it('should delegate save operation to base storage', async () => {
      await todosStorage.save(testTodos)
      expect(mockStorage.save).toHaveBeenCalledWith(testTodos)
    })

    it('should handle errors gracefully', async () => {
      const error = new Error('Save failed')
      mockStorage.save.mockRejectedValue(error)
      await expect(todosStorage.save(testTodos)).rejects.toThrow('Save failed')
    })
  })

  describe('load', () => {
    it('should delegate load operation to base storage', async () => {
      mockStorage.load.mockResolvedValue(testTodos)
      const result = await todosStorage.load()
      expect(result).toEqual(testTodos)
      expect(mockStorage.load).toHaveBeenCalled()
    })

    it('should return empty array when no todos exist', async () => {
      mockStorage.load.mockResolvedValue([])
      const result = await todosStorage.load()
      expect(result).toEqual([])
    })

    it('should handle errors gracefully', async () => {
      const error = new Error('Load failed')
      mockStorage.load.mockRejectedValue(error)
      await expect(todosStorage.load()).rejects.toThrow('Load failed')
    })
  })

  describe('clear', () => {
    it('should delegate clear operation to base storage', async () => {
      await todosStorage.clear()
      expect(mockStorage.clear).toHaveBeenCalled()
    })
  })
})
