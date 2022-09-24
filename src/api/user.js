import request from '@/utils/request'

/**
 *  登录接口
 *
 * **/
export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

/**
 *  获取用户的基本资料接口
 *
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logout() {

}
