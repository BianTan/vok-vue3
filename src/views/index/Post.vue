<template>
  <div class="overflow-hidden p-1 -m-1">
    <card
      class="flex-1 overflow-hidden w-full px-8 md:px-12 py-6 md:py-8 mb-12"
      v-if="loadingStatus === 'success' && currentPost"
    >
      <div class="flex">
        <img
          :src="
            currentPost.author.avatar_url
              ? currentPost.author.avatar_url
              : require('@/assets/img/ava.jpg').default
          "
          :alt="currentPost.author.name"
          class="h-12 w-12 rounded-full shadow mr-4"
        />
        <div class="flex flex-col justify-between overflow-hidden">
          <span class="text-gray-900">{{ currentPost.author.name }}</span>
          <info-list>
            <info-item iconName="date">{{ createdDate }}</info-item>
            <info-item iconName="comment">{{ commentCount }}</info-item>
            <info-item iconName="category"
              ><router-link :to="`/category/${currentPost.category.id}`">{{
                currentPost.category.name
              }}</router-link></info-item
            >
            <info-item iconName="tags" v-if="currentPost.tags.length !== 0">
              <router-link
                v-for="tag in currentPost.tags"
                :key="tag.id"
                :to="`/tag/${tag.id}`"
                class="text-sm"
                >{{ tag.name }}</router-link
              >
            </info-item>
          </info-list>
        </div>
      </div>
      <img
        v-if="currentPost.post_url.length !== 0"
        :src="currentPost.post_url"
        :alt="currentPost.title"
        class="mt-8 rounded w-full"
      />
      <h1 class="text-xl md:mb-14 md:text-2xl xl:text-3xl my-6 text-gray-800">
        {{ currentPost.title }}
      </h1>
      <div
        id="post_content"
        class="text-gray-800"
        v-lightbox="{
          imgs: getImages,
          openLightbox
        }"
        target="_blank"
        v-html="currentPost.content"
      />
    </card>
    <card v-else-if="loadingStatus === 'error'" class="text-center py-4">
      获取数据失败！
    </card>
    <skeleton-post v-else class="mb-12" />
    <comment-list id="comment-list" v-if="false"> Hello </comment-list>
    <vue-lightbox ref="lightboxRef" :data="imgArry" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  toRefs
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { PostListProps } from '@/types'
import {
  buildToc,
  useCommentCount,
  useDay,
  setTitleTreeHighlight
} from '@/utlis'
import { titleSuffix } from '@/utlis/config'
import { createMessage } from '@/common/message'
import useGoTitle from '@/utlis/useGoTitle'
import lightbox from '@/libs/VueLightbox/directives'
import Card from '@/components/index/Card.vue'
import InfoList from '@/components/index/info/InfoList.vue'
import InfoItem from '@/components/index/info/InfoItem.vue'
import CommentList from '@/components/index/comment/CommentList.vue'
import SkeletonPost from '@/components/skeleton/SkeletonPost.vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default defineComponent({
  components: {
    Card,
    InfoList,
    InfoItem,
    CommentList,
    SkeletonPost
  },
  directives: {
    lightbox
  },
  name: 'Post',
  setup() {
    const route = useRoute()
    const store = useStore()

    const instance = getCurrentInstance()

    const state = reactive({
      id: '',
      timer: null,
      imgArry: [] as string[],
      loadingStatus: computed(() => store.getters['getLoadingStatus'])
    })

    const currentPost = computed<PostListProps>(() =>
      store.getters['index/getCurrentPost'](state.id)
    )
    const commentCount = computed(() =>
      useCommentCount(currentPost.value.comment_count)
    )
    const createdDate = computed(() =>
      useDay('YYYY 年 MM 月 DD 日', currentPost.value.createdAt)
    )

    const getImages = (imgs: string[]) => (state.imgArry = imgs)
    const openLightbox = (id?: string) => 
      (instance.refs.lightboxRef as any).openLightbox(id)

    if (route.params.id) {
      const params = route.params.id + ''
      const res = params.match(/(.*?).html/)
      if (res) state.id = res[1]
    }

    const addTitleClickEvent = (e: any) => {
      e.preventDefault()
      const idName = (e.target as HTMLElement).dataset.id
      if (idName) useGoTitle(idName)
    }

    const init = (title: string) => {
      // 初始化
      document.title = title + titleSuffix // 设置标题
      const titleList = document.querySelectorAll(
        '#post_content > h1, #post_content > h2, #post_content > h3, #post_content > h4, #post_content > h5, #post_content > h6'
      ) // 获取所有标题节点
      const aList = buildToc('post_content', 'title-tree') // 生成标题目录，返回设置好的目录节点
      document.addEventListener('scroll', () =>
        setTitleTreeHighlight(titleList, aList)
      )
      window.addEventListener('resize', () =>
        setTitleTreeHighlight(titleList, aList)
      )
      hljs.highlightAll() // 设置代码高亮
    }

    onMounted(async () => {
      try {
        const res: any = await store.dispatch('index/getCurrentPost', state.id)
        if (res.code === 200) init(res.data[0].title)
        if (res.code === 10) init(currentPost.value.title)
      } catch (error) {
        createMessage(`错误：${error.msg ? error.msg : error.message}`, 'error')
      }

      await nextTick()
      const titleWrapper = document.querySelector('#title-tree')
      titleWrapper.addEventListener('click', addTitleClickEvent)
    })

    onUnmounted(() => {
      const titleWrapper = document.querySelector('#title-tree')
      titleWrapper.innerHTML = ''
      titleWrapper.removeEventListener('click', addTitleClickEvent)
    })

    return {
      ...toRefs(state),
      currentPost,
      commentCount,
      createdDate,
      getImages,
      openLightbox
    }
  }
})
</script>
