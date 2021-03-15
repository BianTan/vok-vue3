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
          title: '留言簿'
        }
      },
      {
        path: '/myfriends',
        name: 'myfriends',
        component: 'index/Page',
        meta: {
          title: '我的朋友'
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

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin } = to.meta
  document.title = to.meta.title + titleSuffix
  if (!isLoaded) {
    addRoutes(routeList)
    isLoaded = true
    next({ ...to, replace: true })
  } else {
    if (!user.isLogin) {  // 未登录
      if (token) {  // 存在 token
        store.dispatch('currentUser').then(() => {
          next()
        }).catch(err => { // token 失效
          if (err === 'Unauthorized') localStorage.removeItem('token')  // token 失效
          if (requiredLogin) {  // 需要登录才能访问
            next('login')
          } else {
            next()
          }
        })
      } else {  // 已登录
        if (requiredLogin) {  // 需要登录才能访问
          next('login')
        } else {
          next()
        }
      }
    } else {
      next()
    }
  }
})