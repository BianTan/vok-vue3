import { IndexStateProps } from "@/types"

export default {
  getPosts: (state: IndexStateProps) => (currentPage: number) => {
    return state.posts.data[currentPage]
  },
  getCurrentPost: (state: IndexStateProps) => (id: string) => {
    return state.currentPost.data[id]
  }
}