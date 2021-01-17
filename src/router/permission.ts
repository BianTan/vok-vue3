import router from './index'
import { RouteRecordRaw } from 'vue-router'

interface RouteProps {
  path: string;
  component: string;
  name: string;
}
const routeList: RouteProps[] = [
  {
    "path": "/themes",
    "name": "Themes",
    "component": "Page"
  },
  {
    "path": "/my-friends",
    "name": "MyFriends",
    "component": "Page"
  }
]

function getAsyncRoutes(routes: RouteProps[]) {
  const res: RouteRecordRaw[] = []
  // 遍历路由数组去重组可用的路由
  routes.forEach((item: RouteProps) => {
    const newItem: RouteRecordRaw = { path: '', redirect: '' }
    newItem.component = require(`../views/${item.component}.vue`).default
    newItem.path = item.path
    newItem.name = item.name
    res.push(newItem)
  })
  return res
}
router.beforeEach(async (to, from, next) => {
  if (router.getRoutes().length <= 6) {
    const routes = getAsyncRoutes(routeList)
    for(const res of routes) {
      router.addRoute(res)
    }
    next({ ...to, replace: true })
  } else {
    next()
  }
})