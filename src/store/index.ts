import { createStore } from 'vuex'

export default createStore({
  state: {
    routes: null,
    currentPost: {
      'id': 1,
      'type': 0,
      'comment_count': 12,
      'post_url': 'https://biandan.me/wp-content/uploads/2020/06/vue_logo.png',
      'tag': ['测试1', '测试2'],
      'category': '默认分类',
      'title': '[1] Vue.js 学习笔记 – Vue 调用高德地图 API',
      'description': '这是一个测试！测试阿',
      'content': '准备写一下天气预报的项目，需要用到定位，就想着调用地图 API 然后就有了这篇笔记    使用的是高德的 javascript-api  API key 申请地址：http://lbs.amap.com/dev/key/app  # h1 Heading 8-)  ## h2 Heading  ### h3 Heading  #### h4 Heading  ##### h5 Heading  ###### h6 Heading  ___  ---  ***  **这是加粗的文字**  *这是倾斜的文字*  ***这是斜体加粗的文字***  ~~这是加删除线的文字~~  ## Typographic replacements  Enable typographer option to see result.  (c) (C) (r) (R) (tm) (TM) (p) (P) +-  test.. test... test..... test?..... test!....  !!!!!! ???? ,,  -- ---  ',
      'author': {
        'id': '1',
        'name': 'BianDan',
        'description': '这个人太懒了，什么都没有说',
        'avatar_url': 'http://60.205.248.2/images/ava.jpg'
      },
      'createdAt': '2020-01-17T15:22:22.983Z',
      'updatedAt': '2020-01-17T15:22:22.983Z'
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getRoutes: (state) => {
      return state.routes
    },
    getCurrentPost: (state) => {
      return state.currentPost
    }
  },
  modules: {
  }
})
