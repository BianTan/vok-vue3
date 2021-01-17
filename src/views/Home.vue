<template>
  <article-list
    @currentChange="currentChange"
    @prevClick="prevClick"
    @nextClick="nextClick">
    <article-item type="0" />
    <article-item type="1" />
    <article-item type="0" />
    <article-item type="0" />
  </article-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { PageEventsProps } from '../types'
import ArticleList from '../components/article/ArticleList.vue'
import ArticleItem from '../components/article/ArticleItem.vue'

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
      ...toRefs(pageEvents)
    }
  }
})
</script>
