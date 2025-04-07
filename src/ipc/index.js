import { handleStorageSave, handleStorageLoad, handleStorageClear } from './storageHandlers.js'

export const registerIpcHandlers = (ipcMain) => {
  ipcMain.handle('storage:save', handleStorageSave)
  ipcMain.handle('storage:load', handleStorageLoad)
  ipcMain.handle('storage:clear', handleStorageClear)
} 