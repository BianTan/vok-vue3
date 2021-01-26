import { createStore } from 'vuex'
import { StateProps } from '@/types'
import { arrToObj } from '@/utlis'
import { get } from '@/network'

export default createStore<StateProps>({
  state: {
    routes: null,
    adminScreenSmall: !!Number(localStorage.getItem('adminScreenSmall')),
    postList: { loadedPage: [], data: {} },
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
    setCurrentPost({ currentPost }, { res, id }) {
      currentPost.data = { ...currentPost.data, ...res }
      currentPost.loadedPost.push(id)
    },
    setPostList({ postList }, { total, pageSize, currentPage, list }) {
      postList.data = { ...postList.data, [currentPage]: {
        total,
        pageSize,
        currentPage,
        list: arrToObj(list)
      } }
      postList.loadedPage.push(currentPage)
    },
    setAdminScreenSmall(state, payload) {
      state.adminScreenSmall = payload
    }
  },
  actions: {
    async getCurrentPost({ state, commit }, id) {
      const index = state.currentPost.loadedPost.indexOf(id)
      if(index < 0) { // 如果当前文章未请求过数据才 get
        const res = await get(`/post/${id}`)
        commit('setCurrentPost', { res: arrToObj(res.data), id })
      }
    },
    async getPosts({ state, commit }, { pageSize = 6, currentPage = 1 }) {
      const index = state.postList.loadedPage.indexOf(currentPage)
      if(index < 0) {
        const res = await get(`/post?pageSize=${pageSize}&currentPage=${currentPage}&fields=description`)
        commit('setPostList', res.data)
      }
    }
  },
  getters: {
    getRoutes: (state) => {
      return state.routes
    },
    getPostList: (state) => (currentPage: number) => {
      return state.postList.data[currentPage]
    },
    getCurrentPost: (state) => (id: string) => {
      return state.currentPost.data[id]
    }
  },
  modules: {
  }
})
