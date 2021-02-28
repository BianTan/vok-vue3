import router from './index'
import store from '../store'
import { RouteListProps } from '@/types'
import { titleSuffix } from '@/utlis/config'

const routeList: RouteListProps[] = [
  {
    parentName: 'Index',
    list: [
      {
        path: '/about',
        name: 'about',
        component: 'index/Page',
        meta: {
          title: '关于我'
        }
      },
      {
        path: '/themes',
        name: 'themes',
        component: 'index/Page',
        meta: {
          title: '辣鸡扁担曾制作的 WordPress 主题'
        }
      },
      {
        path: '/guestbook',
        name: 'guestbook',
        component: 'index/Page',
        meta: {
          title: '关于我'
        }
      },
      {
        path: '/myfriends',
        name: 'myfriends',
        component: 'index/Page',
        meta: {
          title: '关于我'
        }
      }
    ]
  }
]

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

let isLoaded = false

router.beforeEach(async (to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin } = to.meta
  document.title = to.meta.title + titleSuffix
  if (!isLoaded) {
    addRoutes(routeList)
    isLoaded = true
    next({ ...to, replace: true })
  } else {
    if (requiredLogin) {  // 如果需要登录访问
      if (!user.isLogin) {  // 状态为未登录
        if (token) {  // 存在 token 验证⬇️
          store.dispatch('currentUser').then(() => {
            next()  // 验证 token 有效 进入
          }).catch(() => { // 无效
            localStorage.removeItem('token')  // 移除失效 token
            next('login') // 进入登录页面
          })
        } else {  // 不存在 token
          next('login') // 进入登录页面
        }
      } else { // 状态为已登录
        next()
      }
    }
    next()
  }
})