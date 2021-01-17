export interface PageEventsProps {
  prevClick: () => void;
  nextClick: () => void;
  currentChange: (value: Number) => void;
}

export interface PostListProps {
  total: number;
  pageSize: number;
  currentPage: number;
  list: PostDataProps[];
}
export interface AuthorProps {
  _id: string;
  name: string;
  description: string;
  avatar_url: string;
}
export interface PostDataProps {
  id: number;
  type: number;
  post_url: string;
  tag: string[];
  category: string;
  title: string;
  description: string;
  content: string;
  author: AuthorProps;
}