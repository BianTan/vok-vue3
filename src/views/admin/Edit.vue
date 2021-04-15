<template>
  <div class="inline-block" v-if="statusList">
    <card class="py-4">
      <ul class="flex space-x-3">
        <admin-link
          :to="{ name: 'adminEdit', query: { post_type } }"
          class="text-center"
          >全部（{{ statusList.allTotal }}）</admin-link
        >
        <admin-link
          :to="{
            name: 'adminEdit',
            query: { post_type, post_status: 'publish' }
          }"
          class="text-center"
          >已发布（{{ statusList.publishTotal }}）</admin-link
        >
        <admin-link
          :to="{
            name: 'adminEdit',
            query: { post_type, post_status: 'draft' }
          }"
          class="text-center"
          >草稿箱（{{ statusList.draftTotal }}）</admin-link
        >
        <admin-link
          :to="{
            name: 'adminEdit',
            query: { post_type, post_status: 'trash' }
          }"
          class="text-center"
          >回收站（{{ statusList.trashTotal }}）</admin-link
        >
      </ul>
    </card>
  </div>
  <skeleton-edit v-else />
  <card class="mt-8 py-4 px-2 hidden md:block">
    <selector :data="optionsOne" />
    <div
      class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer"
    >
      应用
    </div>
    <selector
      :data="categoryOptions"
      class="ml-4"
      @menuClick="getCategoryId"
      :currentId="categoryId"
    />
    <selector
      :data="tagOptions"
      class="pl-0"
      @menuClick="getTagId"
      :currentId="tagId"
    />
    <div
      class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer"
      @click="throttleFilter"
    >
      筛选
    </div>
  </card>
  <card class="mt-8 px-0 py-0 md:px-4 md:py-4 overflow-hidden">
    <div v-if="loadingStatus === 'success' && posts">
      <edit-table :data="posts.list" />
    </div>
    <p v-else-if="loadingStatus === 'error'" class="text-center py-4">
      获取数据失败！
    </p>
    <p v-else class="text-center py-4">加载中...</p>
  </card>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDayzh, throttle } from '@/utlis'
import { get } from '@/network'
import { PostsProps, OptionsProps } from '@/types'
import { createMessage } from '@/common/message'
import Card from '@/components/admin/Card.vue'
import SkeletonEdit from '@/components/skeleton/SkeletonEdit.vue'
import AdminLink from '@/components/admin/AdminLink.vue'
import Selector from '@/components/Selector/index.vue'
import EditTable from '@/components/admin/EditTable/index.vue'

export default defineComponent({
  components: {
    Card,
    AdminLink,
    Selector,
    SkeletonEdit,
    EditTable
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 数据 👇
    const postState = reactive({
      loadingStatus: computed(() => store.getters['getLoadingStatus']),
      statusList: computed(() => store.getters['admin/getStatusList']),
      posts: {} as PostsProps, // 获取文章列表
      post_type: computed(() => route.query.post_type || 'post'), // Edit编辑文章的类型 post or page
      post_status: computed(() => route.query.post_status) // Edit编辑的文章状态
    })
    const state = reactive({
      currentPage: 1, // 当前列表第几页？
      categoryId: 0, // 当前筛选分类 0 表示全部
      tagId: 0 // 当前筛选标签 0 表示全部
    })
    const termState = reactive({
      categoryId: computed(() => route.query.categoryId as string), // 由链接获得的分类ID
      tagId: computed(() => route.query.tagId as string) // 由链接获得的标签ID
    })
    const options = reactive({
      optionsOne: [
        // 批量操作
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
      categoryOptions: computed(() => {
        // 获取所有的文章分类
        const base = {
          id: 0,
          value: '0',
          text: '所有分类'
        }
        const get: OptionsProps[] = store.getters['admin/getCategoryList'] // 获取分类数据
        return [base, ...get]
      }),
      tagOptions: computed(() => {
        // 获取所有文章标签
        const base = {
          id: 0,
          value: '0',
          text: '所有标签'
        }
        const get: OptionsProps[] = store.getters['admin/getTagList'] // 获取标签数据
        return [base, ...get]
      })
    })
    //数据 👆

    // 事件 👇
    const handleFilterTermClick = () => {
      let termStr = ''
      if (postState.post_status && postState.post_status !== '') {
        termStr += `&post_status=${postState.post_status}`
      }
      if (state.categoryId !== 0) {
        termStr += `&categoryId=${state.categoryId}`
      }
      if (state.tagId !== 0) {
        termStr += `&tagId=${state.tagId}`
      }
      router.push(`/vok-admin/edit?post_type=${postState.post_type}${termStr}`)
    }
    const clickEvent = reactive({
      getCategoryId: (res: string[]) => {
        // 获取 selector 组件 category 传来的 数据 [index, value]
        state.categoryId = parseInt(res[0]) // 并设置
      },
      getTagId: (res: string[]) => {
        // 获取 selector 组件 tag 传来的 数据 [index, value]
        state.tagId = parseInt(res[0]) // 并设置
      },
      tableItemIsChange: (value: any) => {
        console.log(value)
      },
      throttleFilter: throttle(handleFilterTermClick, 1000)
    })

    const getPostList = async (payload: any) => {
      postState.posts = null
      const { currentPage = 1, post_status, termStr } = payload
      const post_status_str =
        post_status.length > 0 ? `&post_status=${post_status}` : ''
      try {
        const res = await get(
          `/post/admin?currentPage=${currentPage}${post_status_str}${termStr}`
        )
        postState.posts = res.data
      } catch (error) {
        createMessage(
          `请求错误：${error.msg ? error.msg : error.message}`,
          'error'
        )
      }
    }

    // 实例被挂载
    onMounted(() => {
      store.dispatch('admin/getCategoryList') // 请求分类数据
      store.dispatch('admin/getTagList') // 请求标签数据
      store.dispatch('admin/getStatusList') // 请求获取文章数量
      let termStr = '&fields=post_status'
      if (termState.categoryId && termState.categoryId !== '0') {
        // 存在分类 id
        state.categoryId = parseInt(termState.categoryId)
        termStr += `&categoryId=${termState.categoryId}`
      }
      if (termState.tagId && termState.tagId !== '0') {
        // 存在标签 id
        state.tagId = parseInt(termState.tagId)
        termStr += `&tagId=${termState.tagId}`
      }
      if (!postState.post_type || postState.post_type === 'post') {
        // 当前为 “文章”
        getPostList({
          currentPage: state.currentPage,
          post_status: postState.post_status ? postState.post_status : '',
          termStr
        })
      } else if (postState.post_type === 'page') {
        // 当前为 “页面”
        postState.posts = {
          currentPage: 1,
          list: [],
          pageSize: 12,
          total: 0
        }
        // getPostList({
        //   currentPage: state.currentPage,
        //   post_status: postState.post_status ? postState.post_status : '',
        //   termStr
        // })
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
