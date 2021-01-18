import { createStore } from 'vuex'

export default createStore({
  state: {
    routes: null
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getRoutes: (state) => {
      return state.routes
    }
  },
  modules: {
  }
})
