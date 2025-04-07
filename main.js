import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { getDevServerUrl } from './src/utils/dev-server.js'
import { registerIpcHandlers } from './src/ipc/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const devServerUrl = getDevServerUrl()

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      devTools: isDev,
      preload: join(__dirname, 'src', 'preload.js')
    }
  })

  if (isDev) {
    mainWindow.loadURL(devServerUrl)
  } else {
    mainWindow.loadFile(join(__dirname, 'dist', 'index.html'))
  }

  mainWindow.on('close', (event) => {
    if (process.platform === 'darwin') {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

registerIpcHandlers(ipcMain)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
