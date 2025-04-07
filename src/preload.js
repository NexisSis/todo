const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  storage: {
    save: (entityName, data) => ipcRenderer.invoke('storage:save', entityName, data),
    load: (entityName) => ipcRenderer.invoke('storage:load', entityName),
    clear: (entityName) => ipcRenderer.invoke('storage:clear', entityName)
  }
})
