export const getDevServerUrl = () => {
  const host = process.env.VITE_DEV_SERVER_HOST || 'localhost'
  const port = process.env.VITE_DEV_SERVER_PORT || '5173'
  return `http://${host}:${port}`
}
