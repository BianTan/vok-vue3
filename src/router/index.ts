import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Index  = () => import('@/views/index/Index.vue')
const Single = () => import('@/views/index/Single.vue')
const Term = () => import('@/views/index/Term.vue')
const Post = () => import('@/views/index/Post.vue')
const notFound = () => import('@/views/404.vue')

const AdminIndex = () => import('@/views/admin/AdminIndex.vue')
const AdminHome = () => import('@/views/admin/AdminHome.vue')
const Edit = () => import('@/views/admin/Edit.vue')
const Comments = () => import('@/views/admin/Comments.vue')
const Options = () => import('@/views/admin/Options.vue')
const AdminPost = () => import('@/views/admin/Post.vue')
const AdminNewPost = () => import('@/views/admin/NewPost.vue')

const AccountIndex = () => import('@/views/account/AccountIndex.vue')
const Account = () => import('@/views/account/Account.vue')
const Login = () => import('@/views/account/Login.vue')

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
          title: '标签'
        }
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: Term,
        meta: {
          title: '分类'
        }
      },
      {
        path: '/search',
        name: 'Search',
        component: Term,
        meta: {
          title: '搜索'
        }
      },
      {
        path: '/page/:id',
        name: 'Page',
        component: Single,
        meta: {
          title: '我是笨蛋小扁担 - 扁担长 板凳宽 | BianTanW | BianDan'
        }
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: Post,
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
    component: notFound,
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
