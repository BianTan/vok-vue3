export interface PageEventsProps {
  prevClick: () => void;
  nextClick: () => void;
  currentChange: (value: Number) => void;
}

/**
 * 文章
*/
export interface TagsProps {
  id: string;
  name: string;
}
export interface PostListProps {
  total: number;
  pageSize: number;
  currentPage: number;
  list: PostDataProps[];
}
export interface AuthorProps {
  id: string;
  name: string;
  description: string;
  avatar_url: string;
}
export interface PostDataProps {
  id: string;
  type: number;
  comment_count: number;
  post_url: string;
  tags: TagsProps[];
  category: {
    id: string;
    name: string;
  };
  title: string;
  description?: string;
  content?: string;
  author: AuthorProps;
  createdAt: string;
  updatedAt: string;
}
export interface PostPageProps {
  total: number;
  currentPage: number;
  pageSize: number;
  list: ListProps<PostDataProps>;
}
export interface TableListProps {
  id: string;
  title: string;
  tags: TagsProps[];
  category: string;
  createdAt: string;
  comment_count: number;
}

export interface StateProps {
  routes: null;
  adminScreenSmall: boolean;
  postList: {
    loadedPage: number[];
    data: ListProps<PostPageProps>;
  };
  currentPost: {
    loadedPost: number[];
    data: ListProps<PostDataProps>;
  };
  currentTableList: TableListProps[];
}
export interface ListProps<P> {
  [id: string]: P;
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
export interface RouteMetaProps {
  title: String;
}
export interface RouteListProps {
  parentName?: string;
  list?: RouteProps[];
  path?: string;
  name?: string;
  component?: string;
  meta?: RouteMetaProps;
}
