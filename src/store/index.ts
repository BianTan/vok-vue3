import axios from 'axios'
import { createStore } from 'vuex'
import { post } from '@/network'
import indexStore from './index/'
import adminStore from './admin/'

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
    currentUser({ state, commit }) {
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      return post('/user/current').then(res => {
        commit('currentUser', res.data)
      })
    },
    async login({ commit }, payload) {
      const res = await post('/user/login', payload)
      commit('login', res)
      return res
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
