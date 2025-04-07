import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: process.env.VITE_DEV_SERVER_HOST || 'localhost',
    port: parseInt(process.env.VITE_DEV_SERVER_PORT) || 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: process.env.VITE_DEV_SERVER_HOST || 'localhost',
      port: parseInt(process.env.VITE_DEV_SERVER_PORT) || 5173
    }
  }
})
