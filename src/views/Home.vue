<template>
  <article-list
    :total="testData.total"
    :pageSize="testData.pageSize"
    :currentPage="testData.currentPage"
    @currentChange="currentChange"
    @prevClick="prevClick"
    @nextClick="nextClick">
    <article-item v-for="item in testData.list" :key="item.id" :postData="item" />
  </article-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { PageEventsProps, PostListProps } from '../types'
import ArticleList from '../components/article/ArticleList.vue'
import ArticleItem from '../components/article/ArticleItem.vue'

const testData: PostListProps = {
  'total': 4,
  'pageSize': 4, 
  'currentPage': 1,
  'list': [
    {
      'id': 1,
      'type': 0,
      'comment_count': 0,
      'post_url': 'https://biandan-me-static.smartgslb.com/wp-content/uploads/2020/01/04c23d406ccfcf7789ddebc9f5a4f57c.jpg',
      'tag': ['测试1', '测试2'],
      'category': '默认分类',
      'title': '新年好啊！',
      'description': '这是一个测试！测试阿',
      'content': '大噶猴，在这里先祝贺大家新年快乐！！！\n新年新气象！咱换新域名（https://biandan.me）和新主题（New Blog 自用）啦！博客直接重建了，然后保留了部分文章，多余的删除了，至于旧域名（https://biantan.org）依旧继续使用，只不过 301 到新域名上。\n嗷，对了。新主题还算是半成品吧，本来想着过年前完善好直接上线还不是美滋滋，不过...懂得都懂欸嘿，懒癌发作，再说吧...边用边做。\n希望新的一年越来越好（不在水博客',
      'author': {
        'id': '1',
        'name': 'BianDan',
        'description': '这个人太懒了，什么都没有说',
        'avatar_url': ''
      }
    },
    {
      'id': 2,
      'type': 1,
      'comment_count': 0,
      'post_url': '',
      'tag': ['测试1', '测试2'],
      'category': '一言',
      'title': '新年好啊！',
      'description': '',
      'content': '你制定的计划是 .txt 还是 .exe 呢？',
      'author': {
        'id': '1',
        'name': 'BianDan',
        'description': '这个人太懒了，什么都没有说',
        'avatar_url': 'http://60.205.248.2/images/ava.jpg'
      }
    },
    {
      'id': 3,
      'type': 0,
      'comment_count': 0,
      'post_url': '',
      'tag': ['测试1', '测试2'],
      'category': '默认分类',
      'title': 'WordPress 主题 Cro',
      'description': '第二款收费的主题（最近快吃土了喂！ 功能上嘛，和第一款 Tpon 大同小异 售价依旧为64 RMB ，购买请...',
      'content': '大噶猴，在这里先祝贺大家新年快乐！！！\n新年新气象！咱换新域名（https://biandan.me）和新主题（New Blog 自用）啦！博客直接重建了，然后保留了部分文章，多余的删除了，至于旧域名（https://biantan.org）依旧继续使用，只不过 301 到新域名上。\n嗷，对了。新主题还算是半成品吧，本来想着过年前完善好直接上线还不是美滋滋，不过...懂得都懂欸嘿，懒癌发作，再说吧...边用边做。\n希望新的一年越来越好（不在水博客',
      'author': {
        'id': '1',
        'name': 'BianDan',
        'description': '这个人太懒了，什么都没有说',
        'avatar_url': ''
      }
    },
    {
      'id': 4,
      'type': 0,
      'comment_count': 0,
      'post_url': 'https://biandan-me-static.smartgslb.com/wp-content/uploads/2018/08/bilibili.png',
      'tag': ['测试1', '测试2'],
      'category': '默认分类',
      'title': 'BiliBili 获取指定用户粉丝数量 API',
      'description': '博客都长草了，发篇文章除除草 前段时间刷13站看到了这个视频 av26280568 哎呀博客又可以水篇文章了 那...',
      'content': '大噶猴，在这里先祝贺大家新年快乐！！！\n新年新气象！咱换新域名（https://biandan.me）和新主题（New Blog 自用）啦！博客直接重建了，然后保留了部分文章，多余的删除了，至于旧域名（https://biantan.org）依旧继续使用，只不过 301 到新域名上。\n嗷，对了。新主题还算是半成品吧，本来想着过年前完善好直接上线还不是美滋滋，不过...懂得都懂欸嘿，懒癌发作，再说吧...边用边做。\n希望新的一年越来越好（不在水博客',
      'author': {
        'id': '1',
        'name': 'BianDan',
        'description': '这个人太懒了，什么都没有说',
        'avatar_url': ''
      }
    }
  ]
}

export default defineComponent({
  name: 'Home',
  components: {
    ArticleList,
    ArticleItem
  },
  setup() {
    const pageEvents: PageEventsProps = reactive({
      prevClick: () => {
        console.log('上一页')
      },
      nextClick: () => {
        console.log('下一页')
      },
      currentChange: (val: Number) => {
        console.log('当前点击页数：', val)
      }
    })
    return {
      ...toRefs(pageEvents),
      testData
    }
  }
})
</script>
