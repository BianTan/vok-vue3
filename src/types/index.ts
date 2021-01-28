/**
 * 前台页面
*/
export interface IndexStateProps {
  posts: {
    loadedPage: number[];
    data: ListProps<PostsProps>;
  };
  currentPost: {
    loadedPost: number[];
    data: ListProps<PostListProps>;
  };
}
/**
 * 后台管理页
*/
export interface AdminStateProps {
  routes: null;
  screenSmall: boolean;
}
export interface ListProps<P> {
  [id: string]: P;
}
/**
 * 页面分页栏的事件
*/
export interface PageEventsProps {
  prevClick: () => void;
  nextClick: () => void;
  currentChange: (value: number) => void;
}

// 文章
/**
 * 分类 & 标签
*/
export interface TermProps {
  id: string;
  name: string;
}
/**
 * 作者
*/
export interface AuthorProps {
  id: string;
  name: string;
  description: string;
  avatar_url: string;
}
/**
 * vuex 里保存的已加载文章数据 post
*/
export interface PostsProps {
  total: number;
  currentPage: number;
  pageSize: number;
  list: ListProps<PostListProps>;
}
/**
 * vuex 里保存的已加载文章数据： posts 里的 list
*/
export interface PostListProps {
  id: string;
  type: number;
  comment_count: number;
  post_url: string;
  tags: TermProps[];
  category: TermProps;
  title: string;
  description?: string;
  content?: string;
  author: AuthorProps;
  createdAt: string;
  updatedAt: string;
}

/**
 * 路由
*/
export interface RouteProps {
  path: string;
  name: string;
  component: string;
  meta: RouteMetaProps;
}
/**
 * 路由 meta
*/
export interface RouteMetaProps {
  title: String;
}
/**
 * 后端传来的动态路由列表
*/
export interface RouteListProps {
  parentName?: string;
  list?: RouteProps[];
  path?: string;
  name?: string;
  component?: string;
  meta?: RouteMetaProps;
}
