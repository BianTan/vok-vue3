import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Single from '../views/Single.vue'
import Post from '../views/Post.vue'

const routes: Array<RouteRecordRaw> = [
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
