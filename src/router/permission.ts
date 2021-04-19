import router from './index'
import store from '../store'
import { RouteListProps } from '@/types'
import { titleSuffix } from '@/utlis/config'
import { createMessage } from '@/common/message'
import { get } from '@/network'

function addRoutes(routes: RouteListProps[]) {
  routes.forEach((item: any) => {
    if (item.list && item.parentName) {
      item.list.forEach((val: any) => {
        val.component = require(`@/views/${val.component}.vue`).default
        router.addRoute(item.parentName, val)
      })
    } else {
      item.component = require(`@/views/${item.component}.vue`).default
      router.addRoute(item)
    }
  })
}

router.beforeEach(async (to, from, next) => {
  const { user, token, isLoaded } = store.state
  const { requiredLogin } = to.meta
  if (!isLoaded) {
    const res = await get('/routes')
    if(res) addRoutes(res.data)
    document.title = to.meta.title + titleSuffix
    store.state.isLoaded = true
    next({ ...to, replace: true })
  } else {
    document.title = to.meta.title + titleSuffix
    if (!user.isLogin) {  // 未登录
      if(requiredLogin) {  // 需要登录可访问
        if (token) {  // 存在 token
          try {
            await store.dispatch('currentUser')
            next()
          } catch (err) {
            if (err && err.code === 401) {
              localStorage.removeItem('token')  // token 失效
              createMessage('登录信息已过期，请登录后访问.', 'error')
            } else {
              createMessage(`错误：${err.message}`, 'error')
            }
            next('login')
          }
        } else {  // 不存在 token
          next('login')
          createMessage('未登录，请登录后访问.', 'error')
        }
      } else {  // 不需要登录可访问
        next()
      }
    } else {  // 已登录
      next()
    }
  }
})