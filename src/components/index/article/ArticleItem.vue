<template>
  <article v-if="postData.type === 0" class="bg-white rounded overflow-hidden shadow pb-6" :class="[{'pt-6': postData.post_url.length === 0}]">
    <router-link :to="`/post/${postData.id}.html`" class="h-60 w-full inline-block mb-3" v-if="postData.post_url.length !== 0">
      <img :src="postData.post_url" alt="title" class="w-full h-full object-cover">
    </router-link>
    <router-link class="px-8 mt-1 mb-3 text-xl sm:text-2xl inline-block" :to="`/post/${postData.id}.html`">{{postData.title}}</router-link>
    <p class="px-8 text-sm text-gray-500 text-justify">{{postData.description}}</p>
    <info-list class="px-8 mt-2">
      <info-item iconName="date">{{createdDate}}</info-item>
      <info-item iconName="comment">{{commentCount}}</info-item>
      <info-item iconName="category"><router-link :to="`/category/${postData.category}`">{{postData.category}}</router-link></info-item>
      <info-item iconName="tags">
        <router-link v-for="(tag, index) in postData.tag" :key="index" :to="`/tag/${tag}`" class="text-sm">{{tag}}</router-link>
      </info-item>
    </info-list>
  </article>
  <article v-else-if="postData.type === 1" class="flex">
    <img :src="postData.author.avatar_url" :alt="postData.author.name" class="h-16 w-16 object-cover shadow rounded-full">
    <card class="flex-1 relative ml-10 px-7 py-5">
      <i class="iconfont icon-quote text-white bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -left-4"></i>
      <p class="text-gray-700">{{postData.content}}</p>
    </card>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostDataProps } from '@/types'
import { useCommentCount, useDayjs } from '@/utlis'
import InfoList from '../info/InfoList.vue'
import InfoItem from '../info/InfoItem.vue'
import Card from '@/components/Card.vue'

export default defineComponent({
  props: {
    postData: {
      type: Object as PropType<PostDataProps>,
      required: true
    }
  },
  components: {
    InfoList,
    InfoItem,
    Card
  },
  setup(props) {
    const commentCount = computed(() => useCommentCount(props.postData.comment_count))
    const createdDate = computed(() => useDayjs('YYYY 年 MM 月 DD 日', props.postData.createdAt))
    return {
      commentCount,
      createdDate
    }
  }
})
</script>
