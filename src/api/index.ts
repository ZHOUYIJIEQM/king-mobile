import axios, { type AxiosRequestConfig } from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8 * 1000,
})
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error);
  }
)
instance.interceptors.response.use(
  (response: any) => {
    return Promise.resolve(response)
  },
  (error: any) => {
    return Promise.reject(error.response);
  }
)

export default instance

