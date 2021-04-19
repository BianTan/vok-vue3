import axios from 'axios'
import { createStore } from 'vuex'
import { post } from '@/network'
import indexStore from './index/'
import adminStore from './admin/'

export default createStore({
  state: {
    isLoaded: false,
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
    async currentUser({ state, commit }) {
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      const res: any = await post('/user/current')
      commit('currentUser', res.data)
      return res
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
