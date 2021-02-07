<template>
  <tr class="text-sm hover:bg-gray-100 hover:bg-opacity-60 transition ease-in-out duration-200 select-none group">
    <td class="text-center px-4 py-3 relative align-top">
      <table-checkbox @change="change" :checked="currentValue"/>
    </td>
    <td class="px-4 py-3 font-bold truncate align-top">
      <admin-link to="/">{{itemData.title}}</admin-link><br/>
      <div class="mt-1 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-200">
        <admin-link :to="{name: 'adminPost', query: {action: 'edit', post: itemData.id}}">编辑</admin-link>
        <admin-link to="/">移至回收站</admin-link>
        <admin-link :to="{name: 'Post', params: {id: itemData.id}}">查看</admin-link>
      </div>
    </td>
    <td class="px-4 py-3 space-x-1 truncate align-top">
      <admin-link to="/" v-for="tag in itemData.tags" :key="tag.id">#{{tag.name}}</admin-link>
    </td>
    <td class="px-4 py-3 truncate align-top">
      <admin-link to="/">{{itemData.category.name}}</admin-link>
    </td>
    <td class="px-4 py-3 truncate align-top">
      <span>{{useDayzh('YYYY年MM月DD日', itemData.createdAt)}}</span>
    </td>
    <td class="px-4 py-3 truncate align-top text-center">
      <admin-link to="/">{{itemData.comment_count}}</admin-link>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue'
import { PostListProps } from '@/types'
import { useDayzh } from '@/utlis'
import AdminLink from '@/components/admin/AdminLink.vue'
import TableCheckbox from './TableCheckbox.vue'

export default defineComponent({
  components: {
    AdminLink,
    TableCheckbox
  },
  props: {
    itemData: {
      type: Object as PropType<PostListProps>,
      default: {},
      required: true
    },
    index: Number,
    currentValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'onMounted'],
  setup(props, { emit }) {
    const change = (e: any) => {  // checkbox 改变
      emit('change', [props.index, props.itemData.id, (e.target.checked)]) // 提交 [index, isChecked]
    }
    onMounted(() => {
      emit('onMounted')
    })
    return {
      change,
      useDayzh
    }
  }
})
</script>
