import { createStore } from 'vuex'
import indexStore from './index/index'
import adminStore from './admin/index'

export default createStore({
  state: {
    loadingStatus: 'loading'
  },
  mutations: {
    setLoadingStatus(state, payload: string) {
      state.loadingStatus = payload
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
