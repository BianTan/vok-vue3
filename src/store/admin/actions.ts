import { AdminStateProps } from "@/types"
import { Commit } from "vuex"
import { get, post } from '@/network'
import { createMessage } from "@/common/message"

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
      createMessage(`错误：${error.msg ? error.msg : error.message}`, 'error')
    }
  },
  async getTagList({ commit }: Ictx) {
    try {
      const res = await get('/term/tag?isAll=true')
      commit('setTagList', res.data)
    } catch (error) {
      createMessage(`错误：${error.msg ? error.msg : error.message}`, 'error')
    }
  },
  async getStatusList({ commit }: Ictx, type: string) {
    try {
      const res = await post(`/${type}/statuslist`, { type: 0 })
      commit('setStatusList', res.data)
    } catch (error) {
      createMessage(`错误：${error.msg ? error.msg : error.message}`, 'error')
    }
  }
} 