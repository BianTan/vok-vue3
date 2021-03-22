import { AdminStateProps } from "@/types"
import { Commit } from "vuex"
import { get, post } from '@/network'

interface Ictx {
  state: AdminStateProps;
  commit: Commit;
}
export default {
  async getCategoryList({ commit }: Ictx) {
    try {
      const res = await get('/term/category?isAll=true')
      commit('setCategoryList', res.data)
    } catch (error) {
      console.log('error', error)
    }
  },
  async getTagList({ commit }: Ictx) {
    try {
      const res = await get('/term/tag?isAll=true')
      commit('setTagList', res.data)
    } catch (error) {
      console.log('error', error)
    }
  },
  async getStatusList({ commit }: Ictx) {
    try {
      const res = await post('/post/statuslist', { type: 0 })
      commit('setStatusList', res.data)
    } catch (error) {
      console.log('error', error)
    }
  }
} 