import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(), // 初始化vuex时候就从本地获取token
  userinfo: {} // 这里要设置为空对象是因为在快捷访问时候是对象.属性的方式去建立的，如果设置为null,则会报错
}
const mutations = {
  // 添加token
  addToken(state, token) {
    state.token = token // 先在vuex中缓存下token
    setToken(token) // 然后再缓存到本地
  },
  // 移除token
  removeToken(state) {
    state.token = null // 先清空VUEX中的token
    removeToken() // 再清空本地cookie中的缓存的token
  },

  // 获取用户信息
  setUserInfo(state, userinfo) {
    state.userinfo = userinfo
  },
  // 移除用户信息
  reomveUserInfo(state) {
    state.userinfo = {}
  }
}
const actions = {
  // 登陆的异步action
  async login(context, data) {
    // 这里拿到的ret就是相应拦截器成功后返回过来的那个data
    const ret = await login(data)
    context.commit('addToken', ret)
  },
  // 获取用户信息的异步action
  async getUserInfo(context) {
    // 这里拿到的ret就是相应拦截器成功后返回过来的那个data
    const ret = await getUserInfo()
    context.commit('setUserInfo', ret)
    return ret
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
