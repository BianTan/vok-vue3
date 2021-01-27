import { createStore } from 'vuex'
import { StateProps } from '@/types'
import { arrToObj } from '@/utlis'
import { get } from '@/network'

export default createStore<StateProps>({
  state: {
    routes: null,
    adminScreenSmall: !!Number(localStorage.getItem('adminScreenSmall')),
    posts: { loadedPage: [], data: {} },
    currentPost: { loadedPost:[], data: {} },
    currentTableList: [
      {
        id: '1',
        title: 'Vue.js 学习笔记',
        tags: [
          {
            id: '1',
            name: 'Vue'
          },
          {
            id: '2',
            name: '前端'
          }
        ],
        category: '学习笔记',
        createdAt: '2020-01-17T15:22:22.983Z',
        comment_count: 12
      },
      {
        id: '2',
        title: 'Vue.js 学习笔记',
        tags: [
          {
            id: '1',
            name: 'Vue'
          },
          {
            id: '2',
            name: '前端'
          }
        ],
        category: '学习笔记',
        createdAt: '2020-01-17T15:22:22.983Z',
        comment_count: 12
      },
      {
        id: '3',
        title: 'Vue.js 学习笔记',
        tags: [
          {
            id: '1',
            name: 'Vue'
          },
          {
            id: '2',
            name: '前端'
          }
        ],
        category: '学习笔记',
        createdAt: '2020-01-17T15:22:22.983Z',
        comment_count: 12
      }
    ]
  },
  mutations: {
    setPosts({ posts }, res) {
      const { total, pageSize, currentPage, list } = res
      posts.data = { ...posts.data, [currentPage]: {
        total,
        pageSize,
        currentPage,
        list: arrToObj(list)
      } }
      posts.loadedPage.push(currentPage)
    },
    setCurrentPost({ currentPost }, { res, id }) {
      currentPost.data = { ...currentPost.data, ...res }
      currentPost.loadedPost.push(id)
    },
    setAdminScreenSmall(state, payload) {
      state.adminScreenSmall = payload
    }
  },
  actions: {
    async getPosts({ state, commit }, { pageSize = 6, currentPage = 1 }) {
      const index = state.posts.loadedPage.indexOf(currentPage)
      if(index < 0) {
        const res = await get(`/post?pageSize=${pageSize}&currentPage=${currentPage}&fields=description`)
        commit('setPosts', res.data)
      }
    },
    async getCurrentPost({ state, commit }, id) {
      const index = state.currentPost.loadedPost.indexOf(id)
      if(index < 0) { // 如果当前文章未请求过数据才 get
        const res = await get(`/post/${id}`)
        commit('setCurrentPost', { res: arrToObj(res.data), id })
      }
    }
  },
  getters: {
    getRoutes: (state) => {
      return state.routes
    },
    getPosts: (state) => (currentPage: number) => {
      return state.posts.data[currentPage]
    },
    getCurrentPost: (state) => (id: string) => {
      return state.currentPost.data[id]
    }
  },
  modules: {
  }
})
