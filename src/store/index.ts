import { createStore } from 'vuex'
import { StateProps } from '@/types'
import { arrToObj } from '@/utlis'
import axios from 'axios'

export default createStore<StateProps>({
  state: {
    routes: null,
    currentPost: { data: {} }
  },
  mutations: {
    setCurrentPost({ currentPost }, res) {
      currentPost.data = { ...currentPost.data, ...res }
    }
  },
  actions: {
    async getCurrentPost({ commit }) {
      const res = await axios.get('http://localhost')
      commit('setCurrentPost', arrToObj(res.data))
    }
  },
  getters: {
    getRoutes: (state) => {
      return state.routes
    },
    getCurrentPost: (state) => {
      return state.currentPost
    }
  },
  modules: {
  }
})
