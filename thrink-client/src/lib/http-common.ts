import axios, { AxiosInstance } from 'axios'
import Log from '@/lib/logger'

const DEV_SERVER_URL = 'https://api.thrink.net'
const PROD_SERVER_URL = 'https://api.thrink.net'

Log.v(
  `target server url : ${
    process.env.NEXT_PUBLIC_APP_MODE === 'dev' ? DEV_SERVER_URL : PROD_SERVER_URL
  }`,
)

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_MODE === 'dev' ? DEV_SERVER_URL : PROD_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
