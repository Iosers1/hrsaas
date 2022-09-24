import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求服务器的基地址
  timeout: 4000 // 超时时间
})

// 请求拦截器，接收两个参数，一个是请求的配置，一个是错误函数
service.interceptors.request.use(config => {
  // 先判断时候有token
  if (store.getters.token) {
    // 如果有则携带token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 无论是否有token，，都要返回该配置
}, error => {
  return Promise.reject(error)
})

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
  // token过期的被动处理
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 退出登录
    store.dispatch('user/logout')
    // 跳转到登录页面
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
