import fs from 'fs'
import path from 'path'
import { app } from 'electron'

const getEntityFilePath = (entityName) => {
  const userDataPath = app.getPath('userData')
  return path.join(userDataPath, `${entityName}.json`)
}

export const handleStorageSave = async (event, entityName, data) => {
  try {
    const filePath = getEntityFilePath(entityName)
    await fs.promises.writeFile(filePath, JSON.stringify(data))
    console.log(`${entityName} saved to file:`, filePath)
    return filePath
  } catch (error) {
    console.error(`Error saving ${entityName}:`, error)
    throw error
  }
}

export const handleStorageLoad = async (event, entityName) => {
  try {
    const filePath = getEntityFilePath(entityName)
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, 'utf8')
      console.log(`${entityName} loaded from file:`, filePath)
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error(`Error loading ${entityName}:`, error)
    return []
  }
}

export const handleStorageClear = async (event, entityName) => {
  try {
    const filePath = getEntityFilePath(entityName)
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath)
      console.log(`${entityName} file deleted:`, filePath)
      return true
    }
    return false
  } catch (error) {
    console.error(`Error clearing ${entityName}:`, error)
    return false
  }
} 