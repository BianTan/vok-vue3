<template>
  <article v-if="postData.type === 0" class="bg-white rounded overflow-hidden shadow pb-6" :class="[{'pt-6': postData.post_url.length === 0}]">
    <router-link :to="`/post/${postData.id}.html`" class="aspect-w-12 aspect-h-6 sm:aspect-h-5 lg:aspect-h-4 md:aspect-h-3 block mb-3" v-if="postData.post_url.length !== 0">
      <img :src="postData.post_url" alt="title" class="w-full h-full object-cover">
    </router-link>
    <router-link class="px-8 mt-1 mb-3 text-xl sm:text-2xl inline-block" :to="`/post/${postData.id}.html`">{{postData.title}}</router-link>
    <p class="px-8 text-sm text-gray-500 text-justify">{{postData.description}}</p>
    <info-list class="mx-8 mt-2 pb-2">
      <info-item iconName="date">{{createdDate}}</info-item>
      <info-item iconName="comment">{{commentCount}}</info-item>
      <info-item iconName="category"><router-link :to="`/category/${postData.category.id}`">{{postData.category.name}}</router-link></info-item>
      <info-item iconName="tags" v-if="postData.tags.length !== 0">
        <router-link v-for="tag in postData.tags" :key="tag.id" :to="`/tag/${tag.id}`" class="text-sm">{{tag.name}}</router-link>
      </info-item>
    </info-list>
  </article>
  <article v-else-if="postData.type === 1" class="sm:flex">
    <img :src="postData.author.avatar_url ? postData.author.avatar_url : require('@/assets/img/ava.jpg')" :alt="postData.author.name" class="h-16 w-16 object-cover shadow rounded-full hidden sm:block">
    <card class="flex-1 relative sm:ml-10 px-7 py-5">
      <i class="iconfont icon-quote text-white bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 left-2 sm:-top-3 sm:-left-4"></i>
      <p class="text-gray-700">{{postData.description}}</p>
    </card>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostListProps } from '@/types'
import { useCommentCount, useDay } from '@/utlis'
import InfoList from '../info/InfoList.vue'
import InfoItem from '../info/InfoItem.vue'
import Card from '@/components/index/Card.vue'

export default defineComponent({
  props: {
    postData: {
      type: Object as PropType<PostListProps>,
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
    const createdDate = computed(() => useDay('YYYY 年 MM 月 DD 日', props.postData.createdAt))
    return {
      commentCount,
      createdDate
    }
  }
})
</script>
