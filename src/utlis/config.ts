export const titleSuffix = ' — 我是笨蛋小扁担'

export const menuList = [
  {
    id: 1,
    name: '首页',
    url: '/vok-admin',
    iconName: 'home'
  },
  {
    id: 2,
    name: '文章',
    url: '/vok-admin/edit',
    iconName: 'post'
  },
  {
    id: 3,
    name: '页面',
    url: '/vok-admin/edit?post_type=page',
    iconName: 'page'
  },
  {
    id: 4,
    name: '评论',
    url: '/vok-admin/comments',
    iconName: 'comment-admin'
  },
  {
    id: 5,
    name: '设置',
    url: '/vok-admin/options',
    iconName: 'setting'
  }
]

export interface PostTypeProps {
  id: number;
  desc: string;
}
export const postType: PostTypeProps[] = [
  {
    id: 0,
    desc: '文章'
  },
  {
    id: 1,
    desc: '留言'
  }
]

export const postStatus = [
  {
    id: '0',
    value: 'publish',
    text: '已发布'
  },
  {
    id: '1',
    value: 'draft',
    text: '草稿箱'
  },
  {
    id: '2',
    value: 'trash',
    text: '回收站'
  }
]
