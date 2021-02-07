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
    <selector :data="categoryOptions" class="ml-4" @menuClick="getCategoryId" :currentId="categoryId"/>
    <selector :data="tagOptions" class="pl-0" @menuClick="getTagId" :currentId="tagId"/>
    <div class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer" @click="handleFilterTermClick">筛选</div>
  </card>
  <card class="mt-8 px-0 py-0 md:px-4 md:py-4">
    <table-list v-if="posts && loadingStatus === 'success'" :list="posts.list" @isChange="tableItemIsChange">
      <template #default>
        <table-th class="w-full md:w-4/12">标题</table-th>
        <table-th class="w-2/12 hidden md:table-cell">标签</table-th>
        <table-th class="w-2/12 hidden md:table-cell">分类</table-th>
        <table-th class="w-2/12 hidden md:table-cell">日期</table-th>
        <table-th class="w-1/12 hidden md:table-cell">评论</table-th>
      </template>
    </table-list>
    <p v-if="loadingStatus === 'loading'" class="text-center py-4">加载中...</p>
    <p v-if="loadingStatus === 'error'" class="text-center py-4">获取数据失败！</p>
  </card>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDayzh } from '@/utlis'
import Card from '@/components/admin/Card.vue'
import AdminLink from '@/components/admin/AdminLink.vue'
import TableList from '@/components/admin/table/TableList.vue'
import TableTh from '@/components/admin/table/TableTh.vue'
import Selector from '@/components/Selector/index.vue'
import { PostsProps } from '@/types'

export default defineComponent({
  components: {
    Card,
    AdminLink,
    TableList,
    TableTh,
    Selector
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 数据 👇
    const postState = reactive({
      loadingStatus: computed(() => store.getters['getLoadingStatus']),
      posts: computed((): PostsProps => store.getters['admin/getTableList']), // 获取文章列表
      post_type: computed(() => route.query.post_type || 'post'), // Edit编辑文章的类型 post or page
      post_status: computed(() => route.query.post_status) // Edit编辑的文章状态
    })
    const state = reactive({
      currentPage: 1,  // 当前列表第几页？
      categoryId: 0, // 当前分类 0 表示全部
      tagId: 0  // 当前标签 0 表示全部
    })
    const termState = reactive({
      categoryId: computed(() => route.query.categoryId),  // 由链接获得的分类ID
      tagId: computed(() => route.query.tagId)  // 由链接获得的标签ID
    })
    const options = reactive({
      optionsOne: [
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
      ],
      categoryOptions: computed(() => {  // 获取所有的文章分类
        const base = {
          id: 0,
          value: '0',
          text: '所有分类'
        }
        const get = store.getters['admin/getCategoryList']  // 获取分类数据
        return [ base, ...get ]
      }),
      tagOptions: computed(() => { // 获取所有文章标签
        const base = {
          id: 0,
          value: '0',
          text: '所有标签'
        }
        const get = store.getters['admin/getTagList'] // 获取标签数据
        return [ base, ...get ]
      })
    })
    //数据 👆

    // 事件 👇
    const clickEvent = reactive({
      getCategoryId: (res: string[]) => {  // 获取 selector 组件 category 传来的 数据 [index, value]
        state.categoryId = parseInt(res[0]) // 并设置
      },
      getTagId: (res: string[]) => {  // 获取 selector 组件 tag 传来的 数据 [index, value]
        state.tagId = parseInt(res[0]) // 并设置
      },
      tableItemIsChange: (value: any) => {
        console.log(value)
      },
      handleFilterTermClick: () => {
        let termStr = ''
        if(state.categoryId !== 0) {
          termStr += `&categoryId=${state.categoryId}`
        }
        if(state.tagId !== 0) {
          termStr += `&tagId=${state.tagId}`
        }
        router.push(`/vok-admin/edit?post_type=${postState.post_type}${termStr}`)
      }
    })

    // 实例被挂载
    onMounted(() => {
      store.dispatch('admin/getCategoryList') // 请求分类数据
      store.dispatch('admin/getTagList') // 请求标签数据
      let termStr = ''
      if(termState.categoryId) { // 存在id
        termStr += `&categoryId=${termState.categoryId}`
      }
      if(termState.tagId) { // 存在id
        termStr += `&tagId=${termState.tagId}`
      }
      if((!postState.post_type || postState.post_type === 'post')) {  // 当前为 “文章”
        store.dispatch('admin/getTableList', { currentPage: state.currentPage, post_status: postState.post_status ? postState.post_status : '', termStr })
      } else if(postState.post_type === 'page') {  // 当前为 “页面”
        console.log('page')
      }
    })
    return {
      useDayzh,
      ...toRefs(postState),
      ...toRefs(termState),
      ...toRefs(options),
      ...toRefs(clickEvent)
    }
  }
})
</script>
