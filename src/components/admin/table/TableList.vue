<template>
  <table class="w-full border-collapse table-fixed">
    <thead class="h-11 bg-admin-blue-100">
      <tr>
        <table-th class="w-12 text-center relative">
          <table-checkbox :checked="isAllChecked"/>
        </table-th>
        <table-th class="w-5/12">标题</table-th>
        <table-th class="w-2/12">标签</table-th>
        <table-th class="w-2/12">分类</table-th>
        <table-th class="w-2/12">日期</table-th>
        <table-th class="w-1/12">评论</table-th>
      </tr>
    </thead>
    <tbody>
      <table-body-item v-for="item in currentTableList" :key="item.id" :itemData="item"/>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TableTh from './TableTh.vue'
import TableBodyItem from './TableBodyItem.vue'
import TableCheckbox from './TableCheckbox.vue'

export default defineComponent({
  components: {
    TableTh,
    TableBodyItem,
    TableCheckbox
  },
  setup() {
    const store = useStore()
    const currentTableList = computed(() => store.state.currentTableList)
    const isAllChecked = ref(false)
    return {
      currentTableList,
      isAllChecked
    }
  }
})
</script>
