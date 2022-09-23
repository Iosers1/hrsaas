import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求服务器的基地址
  timeout: 4000 // 超时时间
})
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response => {
// 解构数据
  const { success, message, data } = response.data
  // 返回的数据中的success如果为真，则把真正需要的数据data返回给客户端
  if (success) {
    return data
  } else {
    // 如果success为false,则展示错误
    Message.error(message) // 错误提示
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
