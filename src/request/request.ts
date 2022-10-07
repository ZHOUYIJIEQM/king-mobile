import axios, { type AxiosRequestConfig } from 'axios'
const instance = axios.create({
  baseURL: "https://app.yjsjyb.top/web/api",
  // baseURL: "http://localhost:3080/web/api",
  // baseURL: "http://192.168.1.5:3080/web/api",
  timeout: 8 * 1000,
})
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    return config
  },
  error => {
    return Promise.reject(error);
  }
)
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error);
  }
)

export default instance

