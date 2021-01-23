<template>
  <tr class="text-sm hover:bg-gray-100 hover:bg-opacity-60 transition ease-in-out duration-200 select-none">
    <td class="text-center px-4 py-3 relative">
      <table-checkbox/>
    </td>
    <td class="px-4 py-3 font-bold">
      <admin-link to="/">{{itemData.title}}</admin-link>
    </td>
    <td class="px-4 py-3 space-x-1">
      <admin-link to="/" v-for="item in itemData.tag" :key="item">#{{item}}</admin-link>
    </td>
    <td class="px-4 py-3">
      <admin-link to="/">{{itemData.category}}</admin-link>
    </td>
    <td class="px-4 py-3">
      <span>{{itemData.createdAt}}</span>
    </td>
    <td class="px-4 py-3">
      <admin-link to="/">{{itemData.comment_count}}</admin-link>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TableListProps } from '@/types'
import AdminLink from '@/components/admin/AdminLink.vue'
import TableCheckbox from './TableCheckbox.vue'

export default defineComponent({
  components: {
    AdminLink,
    TableCheckbox
  },
  props: {
    itemData: Object as PropType<TableListProps>
  }
})
</script>
