<template>
  <div class="inline-block">
    <card class="py-4">
      <ul class="flex space-x-3">
        <admin-link :to="{name: 'adminEdit', query: { post_type }}" class="text-center">全部文章（14）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'publish' }}" class="text-center">已发布（12）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'draft' }}" class="text-center">草稿箱（2）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'trash' }}" class="text-center">回收站（0）</admin-link>
      </ul>
    </card>
  </div>
  <card class="mt-8 py-4 px-2 hidden md:block">
    <selector :data="optionsOne"/>
    <div class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer">应用</div>
    <selector :data="categoryOptions" class="ml-4"/>
    <selector :data="tagOptions" class="pl-0"/>
    <div class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer">筛选</div>
  </card>
  <card class="mt-8 px-0 py-0 md:px-4 md:py-4">
    <table-list v-if="posts" :list="posts.list" :pageSize="pageSize" />
  </card>
  <card class="mt-8"></card>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted ,ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Card from '@/components/admin/Card.vue'
import AdminLink from '@/components/admin/AdminLink.vue'
import TableList from '@/components/admin/table/TableList.vue'
import Selector from '@/components/Selector/index.vue'

export default defineComponent({
  components: {
    Card,
    AdminLink,
    TableList,
    Selector
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const pageSize = ref(12)
    const currentPage = ref(1)
    const optionsOne = [
      {
        id: 0,
        value: '0',
        text: '批量操作'
      },
      {
        id: 1,
        value: '1',
        text: '移动至回收站'
      },
      {
        id: 2,
        value: '2',
        text: '删除文章'
      }
    ]

    const post_type = computed(() => route.query.post_type)
    const posts = computed(() => store.getters['admin/getTableList'])
    const categoryOptions = computed(() => {
      const base = {
        id: 0,
        value: '0',
        text: '所有分类'
      }
      const get = store.getters['admin/getCategoryList']
      return [ base, ...get ]
    })
    const tagOptions = computed(() => {
      const base = {
        id: 0,
        value: '0',
        text: '所有标签'
      }
      const get = store.getters['admin/getTagList']
      return [ base, ...get ]
    })
      
    onMounted(() => {
      store.dispatch('admin/getCategoryList')
      store.dispatch('admin/getTagList')
      if(!post_type.value || post_type.value === 'post') {
        store.dispatch('admin/getTableList', { currentPage: currentPage.value })
        setTimeout(() => {
          console.log(posts.value)
        }, 3000)
      } else if(post_type.value === 'page') {
        console.log('page')
      }
    })
    return {
      post_type,
      pageSize,
      optionsOne,
      categoryOptions,
      tagOptions,
      posts
    }
  }
})
</script>
