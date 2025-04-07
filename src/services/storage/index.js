import { isElectron } from '../../utils/isElectron'

class StorageService {
  constructor(entityName) {
    this.entityName = entityName
    this.storageKey = entityName
  }

  async save(data) {
    try {
      // Ensure data is serializable by converting to plain objects
      const serializableData = JSON.parse(JSON.stringify(data))

      if (isElectron()) {
        try {
          await window.electronAPI.storage.save(this.entityName, serializableData)
        } catch (error) {
          console.error(`Error saving to electron storage for ${this.entityName}:`, error)
          // Fallback to localStorage if electron storage fails
          localStorage.setItem(this.storageKey, JSON.stringify(serializableData))
          console.log(`Data saved to localStorage for ${this.entityName}`)
        }
      } else {
        localStorage.setItem(this.storageKey, JSON.stringify(serializableData))
        console.log(`Data saved to localStorage for ${this.entityName}`)
      }
    } catch (error) {
      console.error(`Error saving ${this.entityName}:`, error)
      // Don't throw the error, just log it
    }
  }

  async load() {
    try {
      if (isElectron()) {
        const data = await window.electronAPI.storage.load(this.entityName)
        return data || []
      }

      const data = localStorage.getItem(this.storageKey)
      console.log(`Data loaded from localStorage for ${this.entityName}`)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error loading ${this.entityName}:`, error)
      return []
    }
  }

  async clear() {
    try {
      if (isElectron()) {
        await window.electronAPI.storage.clear(this.entityName)
      }
      localStorage.removeItem(this.storageKey)
      console.log(`Data cleared from localStorage for ${this.entityName}`)
    } catch (error) {
      console.error(`Error clearing ${this.entityName}:`, error)
      localStorage.removeItem(this.storageKey)
    }
  }
}

export const createStorage = (entityName) => new StorageService(entityName)
