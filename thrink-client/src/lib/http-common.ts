import axios, { AxiosInstance } from 'axios'

const DEV_SERVER_URL = 'http://localhost:3000'
const PROD_SERVER_URL = 'https://api.thrink.net'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_MODE === 'dev' ? DEV_SERVER_URL : PROD_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
