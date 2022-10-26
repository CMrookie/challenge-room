import { Snackbar } from '@varlet/ui'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { devLog } from './devLog'

const baseURL: string = import.meta.env.VITE_BASE_URL

const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 3000,
  headers: { 'content-type': 'application/json' }
})

const token = localStorage.getItem('token')

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers && token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    return error
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const { data } = response
    devLog(['response: ', response])
    if (data.code !== 200) {
      Snackbar.error(data.msg)
      return Promise.reject(data)
    }
    return response.data
  },
  (error) => {
    return error
  }
)

export default request
