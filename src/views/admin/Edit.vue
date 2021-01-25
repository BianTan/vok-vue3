<template>
  <div class="inline-block">
    <card class="py-4">
      <ul class="flex space-x-3">
        <admin-link :to="{name: 'adminEdit', query: { post_type }}">全部文章（14）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'publish' }}">已发布（12）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'draft' }}">草稿箱（2）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'trash' }}">回收站（0）</admin-link>
      </ul>
    </card>
  </div>
  <card class="mt-8 py-4 px-2 hidden md:block">
    <selector :data="optionsOne"/>
    <div class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer">应用</div>
    <selector :data="optionsTwo" class="ml-4"/>
    <div class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer">筛选</div>
  </card>
  <card class="mt-8 px-0 py-0 md:px-4 md:py-4">
    <table-list/>
  </card>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
    const post_type = computed(() => route.query.post_type)

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
    const optionsTwo = [
      {
        id: 0,
        value: '0',
        text: '所有分类'
      },
      {
        id: 1,
        value: 'Web',
        text: 'Web'
      },
      {
        id: 2,
        value: '学习笔记',
        text: '学习笔记'
      },
      {
        id: 3,
        value: '日常',
        text: '日常'
      },
      {
        id: 4,
        value: '折腾',
        text: '折腾'
      }
    ]

    onMounted(() => {
      if(!post_type.value || post_type.value === 'post') {
        console.log('post')
      } else if(post_type.value === 'page') {
        console.log('page')
      }
    })
    return {
      post_type,
      optionsOne,
      optionsTwo
    }
  }
})
</script>
