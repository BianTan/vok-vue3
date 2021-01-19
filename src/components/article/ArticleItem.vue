<template>
  <article v-if="postData.type === 0" class="bg-white rounded overflow-hidden shadow pb-6" :class="[{'pt-6': postData.post_url.length === 0}]">
    <router-link :to="`/post/${postData.id}.html`" class="h-60 w-full inline-block" v-if="postData.post_url.length !== 0">
      <img :src="postData.post_url" alt="title" class="w-full h-full object-cover">
    </router-link>
    <tag-box class="px-8 mt-2">
      <tag-item v-for="(tag, index) in postData.tag" :key="index" :url="tag">{{tag}}</tag-item>
    </tag-box>
    <router-link class="px-8 my-4 font-bold text-2xl inline-block" :to="`/post/${postData.id}.html`">{{postData.title}}</router-link>
    <p class="px-8 text-sm text-gray-400 text-justify">{{postData.description}}</p>
  </article>
  <article v-else-if="postData.type === 1" class="flex">
    <img :src="postData.author.avatar_url" :alt="postData.author.name" class="h-16 w-16 object-cover shadow rounded-full">
    <div class="flex-1 rounded shadow relative ml-10 px-7 py-5 bg-white">
      <i class="iconfont icon-quote text-white bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -left-4"></i>
      <p class="text-gray-700">{{postData.content}}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostDataProps } from '@/types'
import TagBox from '../tag/TagBox.vue'
import TagItem from '../tag/TagItem.vue'

export default defineComponent({
  props: {
    postData: {
      type: Object as PropType<PostDataProps>,
      required: true
    }
  },
  components: {
    TagBox,
    TagItem
  }
})
</script>
