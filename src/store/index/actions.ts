import { IndexStateProps } from "@/types"
import { Commit } from "vuex"
import { get } from '@/network'
import { arrToObj } from '@/utlis'

interface Ictx {
  state: IndexStateProps;
  commit: Commit;
}
export default {
  async getPosts({ state, commit }: Ictx, { currentPage = 1 }) {
    const index = state.posts.loadedPage.indexOf(currentPage)
    if (index < 0) {
      const res = await get(`/post?currentPage=${currentPage}`)
      commit('setPosts', res.data)
    }
  },
  async getCurrentPost({ state, commit }: Ictx, id: number) {
    const index = state.currentPost.loadedPost.indexOf(id)
    if (index < 0) { // 如果当前文章未请求过数据才 get
      const res = await get(`/post/${id}`)
      commit('setCurrentPost', { res: arrToObj(res.data), id })
    }
  }
} 