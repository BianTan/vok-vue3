import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/index/Index.vue'
import AdminIndex from '@/views/admin/AdminIndex.vue'
import AccountIndex from '@/views/account/AccountIndex.vue'

import Single from '@/views/index/Single.vue'
import Post from '@/views/index/Post.vue'
import notFound from '@/views/404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Single
      },
      {
        path: '/tag/:id',
        name: 'Tag',
        component: Single
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: Single
      },
      {
        path: '/search',
        name: 'Search',
        component: Single
      },
      {
        path: '/page/:id',
        name: 'Page',
        component: Single
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: Post
      }
    ]
  },
  {
    path: '/vok-admin',
    component: AdminIndex,
    children: [

    ]
  },
  {
    path: '/login',
    name: 'AccountIndex',
    component: AccountIndex
  },
  {
    path: '/404',
    name: 'notFound',
    component: notFound
  },
  {
    path: '/*', 
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
