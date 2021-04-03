<template>
  <table class="w-full">
    <thead class="bg-admin-blue-50">
      <tr class="select-none">
        <th
          class="px-5 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
        >
          <label class="flex cursor-pointer items-center">
            <input
              class="cursor-pointer outline-none h-4 w-4 hidden"
              type="checkbox"
              :checked="data.length === checkedTotal && data.length !== 0"
              @change="handleAllCheckboxChange"
            />
            <div
              class="relative cursor-pointer border-admin-blue-500 rounded iconfont"
            />
            <p class="ml-4">文章标题</p>
          </label>
        </th>
        <th
          class="hidden lg:table-cell w-1/6 px-5 py-3 text-left text-xs font-medium text-gray-500 tracking-wider lg:"
        >
          分类目录
        </th>
        <th
          class="hidden lg:table-cell w-1/5 px-5 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
        >
          文章标签
        </th>
        <th
          class="hidden lg:table-cell w-20 p-3 text-left text-xs font-medium text-gray-500 tracking-wider"
        >
          评论数量
        </th>
        <th
          class="hidden lg:table-cell w-1/6 px-5 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
        >
          发布日期
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <EditTableItem
        v-for="post in posts"
        :key="post.id"
        :data="post"
        @handleCheckboxChange="postCheckedChange"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
  InputHTMLAttributes
} from 'vue'
import { PostListProps } from '@/types'
import EditTableItem from './Item.vue'

export default defineComponent({
  name: 'EditTable',
  components: { EditTableItem },
  props: {
    data: {
      type: Array as PropType<PostListProps[]>,
      default: []
    }
  },
  setup(props) {
    const state = reactive({
      posts: props.data,
      checkedTotal: computed(
        () => props.data.filter(post => post.checked === true).length
      )
    })

    const postCheckedChange = ({ id, checked }: any) => {
      state.posts.forEach(post => {
        if (post.id === id) post.checked = checked
      })
    }
    const handleAllCheckboxChange = (e: InputEvent) => {
      state.posts.forEach(post => {
        post.checked = (e.target as InputHTMLAttributes).checked
      })
    }

    const getCheckedAll = () => {
      const idArr: string[] = []
      state.posts.forEach(post => {
        if (post.checked) idArr.push(post.id)
      })
      return idArr
    }

    return {
      ...toRefs(state),
      postCheckedChange,
      handleAllCheckboxChange,
      getCheckedAll
    }
  }
})
</script>
