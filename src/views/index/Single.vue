<template>
  <article-list
    v-if="postList"
    :total="postList.total"
    :pageSize="postList.pageSize"
    :currentPage="postList.currentPage"
    @currentChange="currentChange"
    @prevClick="prevClick"
    @nextClick="nextClick">
    <div v-if="infoShow" class="bg-white text-4xl mb-12 py-18 text-center shadow rounded">{{name}}</div>
    <article-item v-for="item in postList.list" :key="item.id" :postData="item" />
  </article-list>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PageEventsProps } from '@/types'
import ArticleList from '@/components/index/article/ArticleList.vue'
import ArticleItem from '@/components/index/article/ArticleItem.vue'

export default defineComponent({
  name: 'Single',
  components: {
    ArticleList,
    ArticleItem
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const name = computed(() => route.name)
    const infoShow = ref(false)
    const page = ref('1')
    
    if (name.value === 'Home' || name.value === 'Page') {
      infoShow.value = false
    } else {
      infoShow.value = true
    }
    
    if(name.value !== 'Home') {
      page.value = route.params.id + ''
    }
    const postList = computed(() => store.getters.getPostList(page.value))

    onMounted(() => {
      store.dispatch('getPosts', { pageSize: 6, currentPage: page.value })
    })

    const pageEvents: PageEventsProps = reactive({
      prevClick: () => {
        console.log('上一页')
      },
      nextClick: () => {
        console.log('下一页')
      },
      currentChange: (val: Number) => {
        if(name.value == 'Home') {
          router.push({ path: `/page/${val}` })
          return
        }
        router.push({ path: `/${String(name.value).toLocaleLowerCase()}/${val}` })
      }
    })
    return {
      ...toRefs(pageEvents),
      postList,
      infoShow,
      name
    }
  }
})
</script>
