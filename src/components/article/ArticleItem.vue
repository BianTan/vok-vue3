<template>
  <article v-if="type === '0'" class="bg-white rounded overflow-hidden shadow mb-8 pb-6 ">
    <router-link to="/" class="h-60 w-full inline-block">
      <img src="https://biandan-me-static.smartgslb.com/wp-content/uploads/2020/01/04c23d406ccfcf7789ddebc9f5a4f57c.jpg" alt="title" class="w-full h-full object-cover">
    </router-link>
    <tag-box class="px-8 mt-2">
      <tag-item url="/">测试1</tag-item>
      <tag-item url="/">测试2</tag-item>
    </tag-box>
    <router-link class="px-8 my-4 font-bold text-xl inline-block" to="/">标题 - 新年快乐</router-link>
    <p class="px-8 text-sm text-gray-400 text-justify">博客都长草了，发篇文章除除草 前段时间刷13站看到了这个视频 av26280568 哎呀博客又可以水篇文章了 那...博客都长草了，发篇文章除除草 前段时间刷13站看到了这个视频 av26280568 哎呀博客又可以水篇文章了 那...博客都长草了，发篇文章除除草 前段时间刷13站看到了这个视频 av26280568 哎呀博客又可以水篇文章了 那...</p>
  </article>
  <article v-else-if="type === '1'" class="flex my-14">
    <img src="http://60.205.248.2/images/ava.jpg" alt="BianDan" class="h-16 w-16 object-cover shadow rounded-full">
    <div class="flex-1 rounded shadow relative ml-10 px-7 py-5 bg-white">
      <i class="iconfont icon-quote text-white bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -left-4"></i>
      <p class="text-gray-700">你制定的计划是 .txt 还是 .exe 呢？</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TagBox from '../tag/TagBox.vue'
import TagItem from '../tag/TagItem.vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true
    }
  },
  components: {
    TagBox,
    TagItem
  }
})
</script>
