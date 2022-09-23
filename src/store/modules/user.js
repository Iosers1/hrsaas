import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 初始化vuex时候就从本地获取token
}
const mutations = {
  addToken(state, token) {
    state.token = token // 先在vuex中缓存下token
    setToken(token) // 然后再缓存到本地
  },
  removeToken(state) {
    state.token = null // 先清空VUEX中的token
    removeToken() // 再清空本地cookie中的缓存的token
  }
}
const actions = {
  async login(context, data) {
    const ret = await login(data)
    if (ret.data.success) {
      context.commit('addToken', ret.data.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
