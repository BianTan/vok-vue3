import { IndexStateProps, PostListProps, PostsProps } from "@/types"

export default {
  getPosts: (state: IndexStateProps) => (currentPage: number): PostsProps => {
    return state.posts.data[currentPage]
  },
  getCurrentPost: (state: IndexStateProps) => (id: string): PostListProps => {
    return state.currentPost.data[id]
  }
}