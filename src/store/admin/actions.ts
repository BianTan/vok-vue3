import { AdminStateProps } from "@/types"
import { Commit } from "vuex"
import { get } from '@/network'

interface Ictx {
  state: AdminStateProps;
  commit: Commit;
}
export default {
  async getTableList({ commit }: Ictx, payload: any) {
    const { pageSize, currentPage } = payload
    const res = await get(`/post?pageSize=${pageSize}&currentPage=${currentPage}`)
    commit('setTableList', res.data)
  },
  async getCategoryList({ commit }: Ictx) {
    const res = await get(`/term/category?isAll=true`)
    commit('setCategoryList', res.data)
  },
  async getTagList({ commit }: Ictx) {
    const res = await get(`/term/tag?isAll=true`)
    commit('setTagList', res.data)
  }
} 