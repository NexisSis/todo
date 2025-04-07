import { describe, it, beforeEach, afterEach, vi } from 'vitest'
import { createStorage } from '../index'

describe('Storage Service', () => {
  let storage
  const testEntity = 'testEntity'
  const testData = [{ id: 1, name: 'Test Item' }]

  beforeEach(() => {
    storage = createStorage(testEntity)
    // Mock localStorage
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    }
    // Mock electronAPI
    global.window = {
      electronAPI: {
        isElectron: false,
        storage: {
          save: vi.fn(),
          load: vi.fn(),
          clear: vi.fn()
        }
      }
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('save', () => {
    it('should save data to localStorage when not in Electron', async () => {
      await storage.save(testData)
      expect(localStorage.setItem).toHaveBeenCalledWith(testEntity, JSON.stringify(testData))
    })

    it('should save data through electronAPI when in Electron', async () => {
      window.electronAPI.isElectron = true
      await storage.save(testData)
      expect(window.electronAPI.storage.save).toHaveBeenCalledWith(testEntity, testData)
    })

    it('should handle errors gracefully', async () => {
      const error = new Error('Save failed')
      window.electronAPI.storage.save.mockRejectedValue(error)
      window.electronAPI.isElectron = true

      await expect(storage.save(testData)).resolves.not.toThrow()
      expect(localStorage.setItem).toHaveBeenCalledWith(testEntity, JSON.stringify(testData))
    })
  })

  describe('load', () => {
    it('should load data from localStorage when not in Electron', async () => {
      localStorage.getItem.mockReturnValue(JSON.stringify(testData))
      const result = await storage.load()
      expect(result).toEqual(testData)
      expect(localStorage.getItem).toHaveBeenCalledWith(testEntity)
    })

    it('should load data through electronAPI when in Electron', async () => {
      window.electronAPI.isElectron = true
      window.electronAPI.storage.load.mockResolvedValue(testData)
      const result = await storage.load()
      expect(result).toEqual(testData)
      expect(window.electronAPI.storage.load).toHaveBeenCalledWith(testEntity)
    })

    it('should return empty array when no data exists', async () => {
      localStorage.getItem.mockReturnValue(null)
      const result = await storage.load()
      expect(result).toEqual([])
    })

    it('should handle errors gracefully', async () => {
      const error = new Error('Load failed')
      window.electronAPI.storage.load.mockRejectedValue(error)
      window.electronAPI.isElectron = true

      const result = await storage.load()
      expect(result).toEqual([])
    })
  })

  describe('clear', () => {
    it('should clear data from localStorage when not in Electron', async () => {
      await storage.clear()
      expect(localStorage.removeItem).toHaveBeenCalledWith(testEntity)
    })

    it('should clear data through electronAPI when in Electron', async () => {
      window.electronAPI.isElectron = true
      await storage.clear()
      expect(window.electronAPI.storage.clear).toHaveBeenCalledWith(testEntity)
    })
  })
})
