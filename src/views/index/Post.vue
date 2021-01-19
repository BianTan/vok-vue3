<template>
  <div class="space-y-12">
    <card class="overflow-hidden px-8 md:px-12 py-6 md:py-8">
      <div class="flex">
        <img :src="currentPost.author.avatar_url" :alt="currentPost.author.name" class="h-12 w-12 rounded-full shadow mr-4">
        <div class="flex flex-col justify-between">
          <span class="text-gray-900">{{currentPost.author.name}}</span>
          <info-list>
            <info-item iconName="date">{{createdDate}}</info-item>
            <info-item iconName="comment">{{commentCount}}</info-item>
            <info-item iconName="category"><router-link :to="`/category/${currentPost.category}`">{{currentPost.category}}</router-link></info-item>
            <info-item iconName="tags">
              <router-link v-for="(tag, index) in currentPost.tag" :key="index" :to="`/tag/${tag}`" class="text-sm">{{tag}}</router-link>
            </info-item>
          </info-list>
        </div>
      </div>
      <img :src="currentPost.post_url" :alt="currentPost.title" class="my-8 rounded">
      <h1 class="text-xl md:text-2xl xl:text-3xl mb-6 text-gray-800">{{currentPost.title}}</h1>
      <div id="post_content" class="text-gray-700" v-html="currentHTML"></div>
    </card>
    <comment-list>
      Hello
    </comment-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { PostDataProps } from '@/types'
import { useCommentCount, useDayjs } from '@/utlis/useDayjs'
import MarkDownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import Card from '@/components/Card.vue'
import InfoList from '@/components/index/info/InfoList.vue'
import InfoItem from '@/components/index/info/InfoItem.vue'
import CommentList from '@/components/index/comment/CommentList.vue'

export default defineComponent({
  components: {
    Card,
    InfoList,
    InfoItem,
    CommentList
  },
  name: 'Post',
  setup() {
    const route = useRoute()
    const store = useStore()
    const md: any = new MarkDownIt({
      xhtmlOut: true,
      langPrefix: 'language-',
      linkify: true,
      typographer: true,
      breaks: true,
    }).use(emoji)
    const id = route.params.id
    const currentPost = computed<PostDataProps>(() => store.getters.getCurrentPost)
    const currentHTML = computed(() => {
      if(currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
      }
    })
    const commentCount = useCommentCount(currentPost.value.comment_count)
    const createdDate = useDayjs(currentPost.value.createdAt, 'YYYY 年 MM 月 DD 日')
    if(currentPost.value && currentPost.value.title) document.title = currentPost.value.title
    return {
      id,
      currentHTML,
      currentPost,
      commentCount,
      createdDate
    }
  }
})
</script>
