import store from './store'
import router from './router'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 白名单
const whitelist = ['/login', '/404']
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  // 进来就开启进度条
  NProgress.start()
  // 判断是否有token
  if (store.getters.token) {
    // 如果有token，再判断要去的页面是不是登录页面
    if (to.path === '/login') {
      // 如果是，则无需去登录，直接跳到主页
      next('/') // 跳到主页
    } else {
      // 当有token，并且跳转的不是登陆页面的时候，就需要获取用户资料，但是也只获取一次就可以
      if (!store.state.user.userinfo.userId) {
        console.log(store.state.user)
        // 取反就是说明还没有获取用户资料
        await store.dispatch('user/getUserInfo')
      }
      next() // 放行
    }
  } else {
    // 到这一步就是没有token，，先判断要去的页面是不是在白名单里，有的话放行，没有则跳转到登录页面
    if (whitelist.indexOf(to.path) > -1) {
      // 数组的indexOf方法，查找给定元素是否在该数组内，有则返回找到的第一个元素的索引值，没有则返回-1，大于-1说明有
      next() // 在白名单内，则放行
    } else {
      next('/login') // 不在白名单内，则跳转到登录页面
    }
  }
  // 手动清除一次进度条，避免在地址栏输入要跳转的页面时候，进度条不取消
  NProgress.done()
})
// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})
