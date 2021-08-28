import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/index/Single.vue'),
        meta: {
          title: '我是笨蛋小扁担 - 扁担长 板凳宽 | BianTanW | BianDan'
        }
      },
      {
        path: '/tag/:id',
        name: 'Tag',
        component: () => import('@/views/index/Term.vue'),
        meta: {
          title: '标签'
        }
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: () => import('@/views/index/Term.vue'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/index/Term.vue'),
        meta: {
          title: '搜索'
        }
      },
      {
        path: '/page/:id',
        name: 'Page',
        component: () => import('@/views/index/Single.vue'),
        meta: {
          title: '我是笨蛋小扁担 - 扁担长 板凳宽 | BianTanW | BianDan'
        }
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: () => import('@/views/index/Post.vue'),
        meta: {
          title: '标题加载中...',
          isPost: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/vok-admin',
    name: 'adminIndex',
    component: () => import('@/views/admin/AdminIndex.vue'),
    meta: {
      title: '仪表盘',
      validate: true,
      requiredLogin: true
    },
    children: [
      {
        path: '/vok-admin',
        name: 'adminHome',
        component: () => import('@/views/admin/AdminHome.vue'),
        meta: {
          index: 1
        }
      },
      {
        path: '/vok-admin/edit',
        name: 'adminEdit',
        component: () => import('@/views/admin/Edit.vue'),
        meta: {
          index: 2
        }
      },
      {
        path: '/vok-admin/comments',
        name: 'adminComments',
        component: () => import('@/views/admin/Comments.vue'),
        meta: {
          index: 4
        }
      },
      {
        path: '/vok-admin/options',
        name: 'options',
        component: () => import('@/views/admin/Options.vue'),
        meta: {
          index: 5
        }
      },
      {
        path: '/vok-admin/post',
        name: 'adminPost',
        component: () => import('@/views/admin/Post.vue'),
        meta: {
          index: 2
        }
      },
      {
        path: '/vok-admin/new-post',
        name: 'adminNewPost',
        component: () => import('@/views/admin/NewPost.vue'),
        meta: {
          index: 2
        }
      }
    ]
  },
  {
    path: '/account',
    name: 'AccountIndex',
    component: () => import('@/views/account/AccountIndex.vue'),
    children: [
      {
        path: '/account/:id',
        name: 'Account',
        component: () => import('@/views/account/Account.vue'),
        meta: {
          title: '个人信息'
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
