import router from './index'
import { RouteListProps } from '@/types'

const title = ' - 我是笨蛋小扁担'
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
    if(item.list && item.parentName) {
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
  document.title = to.meta.title + title
  if(!isLoaded) {
    addRoutes(routeList)
    isLoaded = true
    next({ ...to, replace: true })
  } else {
    next()
  }
})