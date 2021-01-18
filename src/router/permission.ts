import router from './index'
import { RouteListProps } from '@/types'

const routeList: RouteListProps[] = [
  {
    parentName: 'Index',
    list: [
      {
        path: '/about',
        name: 'about',
        component: 'index/Page'
      },
      {
        path: '/themes',
        name: 'themes',
        component: 'index/Page'
      },
      {
        path: '/guestbook',
        name: 'guestbook',
        component: 'index/Page'
      },
      {
        path: '/myfriends',
        name: 'myfriends',
        component: 'index/Page'
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
  if(!isLoaded) {
    addRoutes(routeList)
    isLoaded = true
    next({ ...to, replace: true })
  } else {
    next()
  }
})