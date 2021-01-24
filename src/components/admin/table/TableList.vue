<template>
  <table class="w-full border-collapse table-fixed">
    <thead class="h-11 bg-admin-blue-100">
      <tr>
        <table-th class="w-12 text-center relative">
          <table-checkbox :checked="isAllChecked" @change="allCheckboxChange" />
        </table-th>
        <table-th class="w-5/12">标题</table-th>
        <table-th class="w-2/12">标签</table-th>
        <table-th class="w-2/12">分类</table-th>
        <table-th class="w-2/12">日期</table-th>
        <table-th class="w-1/12">评论</table-th>
      </tr>
    </thead>
    <tbody>
      <table-body-item v-for="(item, index) in currentTableList"
        :currentId="index"
        :key="item.id"
        :itemData="item"
        :currentValue="checkedList[index] || false"
        @change="change"/>
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

    const isAllChecked = ref(false) // 是否全部选中
    const checkedList = ref<any>([])  // checked 选中状态列表

    const currentTableList = computed(() => store.state.currentTableList) // 文章管理列表
    const change = (result: any) => {  // checkbox 改变
      checkedList.value[result[0]] = result[1]  // value：[index, isChecked]
      if(currentTableList.value.length !== checkedList.value.length) return
      const res = checkedList.value.every((value: boolean) => {
        return value === true
      })
      isAllChecked.value = res
    }
    const allCheckboxChange = () => { // 食物链顶端的 checkbox 被改变（大雾
      const value = isAllChecked.value = !isAllChecked.value  // 切换状态
      if(value) { // 如果勾上了
        for(const index in currentTableList.value) {  // 按照当前列表的数据长度循环
          checkedList.value[index] = true // true 一把梭
        }
      } else {  // 不然没勾上
        checkedList.value = []  // 清空
      }
    }
    return {
      currentTableList,
      isAllChecked,
      change,
      allCheckboxChange,
      checkedList
    }
  }
})
</script>
