import { IndexStateProps, PostListProps, ListProps } from "@/types"

interface CurrentPostProps {
  res: ListProps<PostListProps>;
  id: number;
}
interface ResProps {
  total: number;
  currentPage: number;
  pageSize: number;
  list: PostListProps[];
}
export default {
  setPosts({ posts }: IndexStateProps, res: ResProps) {
    const { total, pageSize, currentPage, list } = res
    posts.data = {
      ...posts.data,
      [currentPage]: {
        total,
        pageSize,
        currentPage,
        list
      }
    }
    posts.loadedPage.push(currentPage)
  },
  setCurrentPost({ currentPost }: IndexStateProps, { res, id }: CurrentPostProps) {
    currentPost.data = { ...currentPost.data, ...res }
    currentPost.loadedPost.push(id)
  },
}