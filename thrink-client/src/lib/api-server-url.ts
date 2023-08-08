export const API_SERVER_URL =
  process.env.NEXT_PUBLIC_APP_MODE === 'dev' ? 'http://localhost:3000' : 'https://api.thrink.net'

export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_APP_MODE === 'dev' ? 'http://localhost:3001' : 'https://thrink.net'
