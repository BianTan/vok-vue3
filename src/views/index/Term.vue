<template>
  <article-list
    v-if="posts"
    :total="posts.total"
    :pageSize="posts.pageSize"
    :currentPage="posts.currentPage"
    @currentChange="currentChange"
    @prevClick="prevClick"
    @nextClick="nextClick">
    <div v-if="posts.info" class="bg-white text-4xl mb-12 py-18 text-center shadow rounded">{{posts.info.name}}</div>
    <article-item v-for="item in posts.list" :key="item.id" :postData="item" />
  </article-list>
  <div class="space-y-12" v-else>
    <skeleton-posts />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PageEventsProps, PostsProps } from '@/types'
import ArticleList from '@/components/index/article/ArticleList.vue'
import ArticleItem from '@/components/index/article/ArticleItem.vue'
import SkeletonPosts from '@/components/skeleton/SkeletonPosts.vue'
import { get } from '@/network'

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

    const infoShow = ref(false)
    const posts = ref<PostsProps | null>(null)
    const name = computed(() => String(route.name).toLocaleLowerCase())
    const page = computed(() => Number(route.query.page) || 1)
    const id = computed(() => String(route.params.id) ||  "1")

    const url = (currentPage: Number) => `${name.value}/${id.value}?currentPage=${currentPage}`

    onMounted(() => {
      get(`/term/${url(page.value)}`).then(res => {
        posts.value = res.data
      })
    })

    const pageEvents: PageEventsProps = reactive({
      prevClick: () => {
        router.push({ path: `/${url(page.value - 1)}` })
        },
      nextClick: () => {
        router.push({ path: `/${url(page.value + 1)}` })
      },
      currentChange: (val: Number) => {
        router.push({ path: `/${url(val)}` })
      }
    })
    return {
      ...toRefs(pageEvents),
      posts,
      infoShow
    }
  }
})
</script>
