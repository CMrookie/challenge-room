import axios, { AxiosInstance } from 'axios'

const baseURL: string = import.meta.env.VITE_BASE_URL

const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 3000,
  headers: { 'content-type': 'application/json' }
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return error
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return error
  }
)

export default request
