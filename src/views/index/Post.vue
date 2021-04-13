<template>
  <div class="space-y-12">
    <card class="overflow-hidden px-8 md:px-12 py-6 md:py-8" v-if="currentPost">
      <div class="flex">
        <img
          :src="
            currentPost.author.avatar_url
              ? currentPost.author.avatar_url
              : require('@/assets/img/ava.jpg')
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
        class="mt-8 rounded"
      />
      <h1 class="text-xl md:text-2xl xl:text-3xl my-6 text-gray-800">
        {{ currentPost.title }}
      </h1>
      <div
        id="post_content"
        class="text-gray-700"
        v-html="currentPost.content"
      />
    </card>
    <skeleton-post v-else />
    <comment-list id="comment-list" v-if="false"> Hello </comment-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PostListProps } from '@/types'
import { useCommentCount, useDay } from '@/utlis'
import { titleSuffix } from '@/utlis/config'
import Card from '@/components/index/Card.vue'
import InfoList from '@/components/index/info/InfoList.vue'
import InfoItem from '@/components/index/info/InfoItem.vue'
import CommentList from '@/components/index/comment/CommentList.vue'
import SkeletonPost from '@/components/skeleton/SkeletonPost.vue'
import { createMessage } from '@/common/message'

export default defineComponent({
  components: {
    Card,
    InfoList,
    InfoItem,
    CommentList,
    SkeletonPost
  },
  name: 'Post',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = ref('1')

    const currentPost = computed<PostListProps>(() =>
      store.getters['index/getCurrentPost'](id.value)
    )
    const commentCount = computed(() =>
      useCommentCount(currentPost.value.comment_count)
    )
    const createdDate = computed(() =>
      useDay('YYYY 年 MM 月 DD 日', currentPost.value.createdAt)
    )

    if (route.params.id) {
      const params = route.params.id + ''
      const res = params.match(/(.*?).html/)
      if (res) id.value = res[1]
    }

    onMounted(() => {
      store
        .dispatch('index/getCurrentPost', id.value)
        .then(res => {
          if (res.code === 200) document.title = res.data[0].title + titleSuffix
        })
        .catch(error => {
          if (error.code === 404) {
            createMessage(
              `错误：${error.msg ? error.msg : error.message} 三秒后回到首页`,
              'error'
            )
            setTimeout(() => {
              router.push('/')
            }, 3000)
          }
        })
      if (currentPost.value)
        document.title = currentPost.value.title + titleSuffix
    })

    return {
      currentPost,
      commentCount,
      createdDate
    }
  }
})
</script>
