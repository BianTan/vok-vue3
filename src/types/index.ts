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
  categoryList: TermProps[];
  tagList: TermProps[];
  statusList: StatusListProps;
}
/**
 * 
*/
export interface StatusListProps {
  allTotal: number;
  publishTotal: number;
  draftTotal: number;
  trashTotal: number;
}
/**
 * 列表
*/
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
  checked?: boolean;
}
/**
 * 后台下拉 options
*/
export interface OptionsProps {
  id: number;
  value: string;
  text: string;
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
  info?: TermProps;
  total: number;
  currentPage: number;
  pageSize: number;
  list: PostListProps[];
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
  checked?: boolean;
  post_status?: string;
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

// input 组件
export type TagType = 'input' | 'textarea'
export type RulesProp = RuleProp[]
type RuleType = 'required' | 'email'
export interface RuleProp {
  type: RuleType;
  message: string;
}

// 后台首页
export interface HomeDataProps {
  commentInfo: [];
  info: {
    total: number;
    url: string;
    iconName: string;
    description: string;
  }[];
  postInfo: {
    id: string;
    title: string;
    createdAt: string;
  }[];
}
