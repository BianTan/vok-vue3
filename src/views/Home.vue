<template>
  <article-list>
    <article-item type="0" />
    <article-item type="1" />
    <article-item type="0" />
    <article-item type="0" />
  </article-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleList from '../components/article/ArticleList.vue'
import ArticleItem from '../components/article/ArticleItem.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ArticleList,
    ArticleItem
  }
})
</script>
