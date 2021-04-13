import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/index/Index.vue'
import Single from '@/views/index/Single.vue'
import Term from '@/views/index/Term.vue'
import Post from '@/views/index/Post.vue'
import notFound from '@/views/404.vue'

import AdminIndex from '@/views/admin/AdminIndex.vue'
import AdminHome from '@/views/admin/AdminHome.vue'
import Edit from '@/views/admin/Edit.vue'
import Comments from '@/views/admin/Comments.vue'
import Options from '@/views/admin/Options.vue'
import AdminPost from '@/views/admin/Post.vue'
import AdminNewPost from '@/views/admin/NewPost.vue'

import AccountIndex from '@/views/account/AccountIndex.vue'
import Account from '@/views/account/Account.vue'
import Login from '@/views/account/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Single,
        meta: {
          title: '我是笨蛋小扁担 - 扁担长 板凳宽 | BianTanW | BianDan'
        }
      },
      {
        path: '/tag/:id',
        name: 'Tag',
        component: Term,
        meta: {
          title: 'Tag'
        }
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: Term,
        meta: {
          title: 'Category'
        }
      },
      {
        path: '/page/:id',
        name: 'Page',
        component: Single,
        meta: {
          title: 'Page'
        }
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        meta: {
          title: 'Post',
          isPost: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/vok-admin',
    name: 'adminIndex',
    component: AdminIndex,
    meta: {
      title: '仪表盘',
      validate: true,
      requiredLogin: true
    },
    children: [
      {
        path: '/vok-admin',
        name: 'adminHome',
        component: AdminHome,
        meta: {
          index: 1
        }
      },
      {
        path: '/vok-admin/edit',
        name: 'adminEdit',
        component: Edit,
        meta: {
          index: 2
        }
      },
      {
        path: '/vok-admin/comments',
        name: 'adminComments',
        component: Comments,
        meta: {
          index: 4
        }
      },
      {
        path: '/vok-admin/options',
        name: 'options',
        component: Options,
        meta: {
          index: 5
        }
      },
      {
        path: '/vok-admin/post',
        name: 'adminPost',
        component: AdminPost,
        meta: {
          index: 2
        }
      },
      {
        path: '/vok-admin/new-post',
        name: 'adminNewPost',
        component: AdminNewPost,
        meta: {
          index: 2
        }
      }
    ]
  },
  {
    path: '/account',
    name: 'AccountIndex',
    component: AccountIndex,
    children: [
      {
        path: '/account/:id',
        name: 'Account',
        component: Account,
        meta: {
          title: '个人信息'
        }
      }
    ]
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
