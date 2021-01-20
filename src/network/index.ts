import axios from 'axios'

// const IS_DEV = process.env.NODE_ENV !== 'production'
// axios.defaults.baseURL = IS_DEV ? '/api' : ''
// axios.defaults.withCredentials = true

// 请求超时
axios.defaults.timeout = 5000

// 公共请求参数
const commonParam = {
}

// 拦截请求
axios.interceptors.request.use(
  req => {
    return req
  },
  e => {
    const { error } = e.response.data
    return Promise.reject(error)
  }
)

// 拦截响应
axios.interceptors.response.use(
  res => {
    return res
  },
  e => {
    const { error } = e.response.data
    return Promise.reject(error)
  }
)

// post方法
export function post (url: string, data?: object) {
  const params = { ...data, ...commonParam }
  return axios.post(url, params)
}

// get方法
export function get (url: string, data?: object) {
  const params = { ...data, ...commonParam }
  return axios.get(url, params)
}