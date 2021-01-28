import { createStore } from 'vuex'
import indexStore from './index/index'
import adminStore from './admin/index'

export default createStore({
  modules: {
    index: indexStore,
    admin: adminStore
  }
})
