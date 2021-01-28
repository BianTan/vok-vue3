<template>
  <table class="w-full border-collapse table-fixed rounded-md overflow-hidden">
    <thead class="bg-admin-blue-100">
      <tr>
        <table-th class="w-12 text-center relative">
          <table-checkbox :checked="isAllChecked" @change="allCheckboxChange" />
        </table-th>
        <table-th class="w-full md:w-4/12">标题</table-th>
        <table-th class="w-2/12 hidden md:table-cell">标签</table-th>
        <table-th class="w-2/12 hidden md:table-cell">分类</table-th>
        <table-th class="w-2/12 hidden md:table-cell">日期</table-th>
        <table-th class="w-1/12 hidden md:table-cell">评论</table-th>
      </tr>
    </thead>
    <tbody>
      <table-body-item v-for="(item, index) in globalResult"
        :key="item.id"
        :index="Number(index)"
        :itemData="item"
        :currentValue="checkedList[index] || false"
        @change="change"/>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue'
import { PostsProps } from '@/types'
import TableTh from './TableTh.vue'
import TableBodyItem from './TableBodyItem.vue'
import TableCheckbox from './TableCheckbox.vue'

export default defineComponent({
  components: {
    TableTh,
    TableBodyItem,
    TableCheckbox
  },
  props: {
    list: {
      type: Object as PropType<PostsProps>,
      default: {},
      required: true
    },
    pageSize: {
      type: Number,
      default: 12
    }
  },
  setup(props) {
    const isAllChecked = ref(false) // 是否全部选中
    const checkedList = ref<any>([])  // checked 选中状态列表
    const globalResult = computed(() => props.list)

    const change = (result: any) => {  // checkbox 改变
      checkedList.value[result[0]] = result[1]  // result：[index, isChecked]
      console.log(checkedList.value)
      const res = checkedList.value.every((value: boolean) => {
        return value === true
      })
      isAllChecked.value = res
    }
    const allCheckboxChange = () => { // 食物链顶端的 checkbox 被改变（大雾
      const value = isAllChecked.value = !isAllChecked.value  // 切换状态
      if(checkedList.value.length < props.pageSize) return
      if(value) { // 如果勾上了
        for(const index in globalResult.value) {  // 按照当前列表的数据长度循环
          checkedList.value[index] = true // true 一把梭
        }
      } else {  // 不然没勾上
        checkedList.value = []  // 清空
      }
    }
    return {
      globalResult,
      isAllChecked,
      change,
      allCheckboxChange,
      checkedList
    }
  }
})
</script>
