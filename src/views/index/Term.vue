<template>
  <div>
    <article-list
      v-if="posts && loadingStatus === 'success'"
      :total="posts.total"
      :pageSize="posts.pageSize"
      :currentPage="posts.currentPage"
      @currentChange="currentChange"
      @prevClick="prevClick"
      @nextClick="nextClick"
    >
      <div
        v-if="posts.info"
        class="bg-white text-4xl mb-12 py-12 text-center shadow rounded"
      >
        {{ posts.info.name }}
      </div>
      <article-item
        v-for="item in posts.list"
        :key="item.id"
        :postData="item"
      />
    </article-list>
    <card v-else-if="loadingStatus === 'error'" class="text-center py-4">
      获取数据失败！
    </card>
    <div class="space-y-12" v-else-if="loadingStatus === 'loading'">
      <skeleton-posts />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { PageEventsProps, PostsProps } from '@/types'
import { get } from '@/network'
import ArticleList from '@/components/index/article/ArticleList.vue'
import ArticleItem from '@/components/index/article/ArticleItem.vue'
import SkeletonPosts from '@/components/skeleton/SkeletonPosts.vue'
import Card from '@/components/index/Card.vue'

export default defineComponent({
  name: 'Single',
  components: {
    ArticleList,
    ArticleItem,
    SkeletonPosts,
    Card
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      infoShow: false,
      posts: null as PostsProps,
      name: computed(() => String(route.name)),
      page: computed(() => Number(route.query.currentPage) || 1),
      id: computed(() => String(route.params.id) || '1'),
      loadingStatus: computed(() => store.getters['getLoadingStatus'])
    })

    onMounted(async () => {
      const s = route.query.s
      if (state.name != 'Search') {
        const res = await get(
          `/term/${state.name}/${state.id}?currentPage=${state.page}`
        )
        state.posts = res.data
      } else {
        if (s === '') return router.push('/')
        if (s) {
          const res = await get(`/search?s=${s}&currentPage=${state.page}`)
          state.posts = res.data
        }
      }
    })

    const pageEvents: PageEventsProps = reactive({
      prevClick: () => {
        router.push({
          name: state.name,
          params: { id: state.id },
          query: { ...route.query, currentPage: state.page - 1 }
        })
      },
      nextClick: () => {
        router.push({
          name: state.name,
          params: { id: state.id },
          query: { ...route.query, currentPage: state.page + 1 }
        })
      },
      currentChange: (val: number) => {
        router.push({
          name: state.name,
          params: { id: state.id },
          query: { ...route.query, currentPage: val }
        })
      }
    })
    return {
      ...toRefs(state),
      ...toRefs(pageEvents)
    }
  }
})
</script>
