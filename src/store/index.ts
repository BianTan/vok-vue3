import axios from 'axios'
import { createStore } from 'vuex'
import { get, post } from '@/network'
import indexStore from './index/index'
import adminStore from './admin/index'

export default createStore({
  state: {
    loadingStatus: 'loading',
    token: localStorage.getItem('token') || '',
    user: {
      isLogin: false
    }
  },
  mutations: {
    setLoadingStatus(state, payload: string) {
      state.loadingStatus = payload
    },
    currentUser(state, user) {
      state.user = { isLogin: true, ...user }
    },
    login(state, { token }) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    async currentUser({ commit, state }) {
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      const res = await get('/user/current')
      commit('currentUser', res.data)
      return res
    },
    async login({ commit }, payload) {
      const res = await post('/user/login', payload)
      commit('login', res.data)
    }
  },
  getters: {
    getLoadingStatus: (state) => {
      return state.loadingStatus
    }
  },
  modules: {
    index: indexStore,
    admin: adminStore
  }
})
