<template>
  <article-list
    v-if="posts"
    :total="posts.total"
    :pageSize="posts.pageSize"
    :currentPage="posts.currentPage"
    @currentChange="currentChange"
    @prevClick="prevClick"
    @nextClick="nextClick">
    <div v-if="false" class="bg-white text-4xl mb-12 py-18 text-center shadow rounded">{{name}}</div>
    <article-item v-for="item in posts.list" :key="item.id" :postData="item" />
  </article-list>
  <div class="space-y-12" v-else>
    <skeleton-posts />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PageEventsProps } from '@/types'
import ArticleList from '@/components/index/article/ArticleList.vue'
import ArticleItem from '@/components/index/article/ArticleItem.vue'
import SkeletonPosts from '@/components/skeleton/SkeletonPosts.vue'

export default defineComponent({
  name: 'Single',
  components: {
    ArticleList,
    ArticleItem,
    SkeletonPosts
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const name = computed(() => route.name)
    const infoShow = ref(false)
    const page = ref(1)
    
    if(name.value === 'Page') {
      page.value = Number(route.params.id)
    }
    const posts = computed(() => store.getters['index/getPosts'](page.value))

    onMounted(() => {
      store.dispatch('index/getPosts', { currentPage: page.value })
    })

    const pageEvents: PageEventsProps = reactive({
      prevClick: () => {
        router.push({ path: `/page/${page.value - 1}` })
      },
      nextClick: () => {
        router.push({ path: `/page/${page.value + 1}` })
      },
      currentChange: (val: Number) => {
        router.push({ path: `/page/${val}` })
      }
    })
    return {
      ...toRefs(pageEvents),
      posts,
      infoShow,
      name
    }
  }
})
</script>
