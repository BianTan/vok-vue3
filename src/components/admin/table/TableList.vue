<template>
  <table class="w-full border-collapse table-fixed rounded-md overflow-hidden">
    <thead class="bg-admin-blue-100">
      <tr>
        <table-th class="w-12 text-center relative">
          <table-checkbox :checked="isAllChecked" @change="allCheckboxChange" />
        </table-th>
        <slot/>
      </tr>
    </thead>
    <tbody v-if='list'>
      <table-item
        v-for="(item, index) in list"
        :key="item.id"
        :index="index"
        :itemData="item"
        :currentValue="checkedList[index] ? checkedList[index].isChecked : false"
        @change="change"
        @onMounted="itemOnMounted"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, reactive } from 'vue'
import { PostListProps } from '@/types'
import TableTh from './TableTh.vue'
import TableItem from './TableBodyItem.vue'
import TableCheckbox from './TableCheckbox.vue'

interface CheckboxResProps {
  id: string;
  isChecked: boolean;
}
interface Istate {
  isAllChecked: boolean;
  checkedList: CheckboxResProps[];
  listLength: number;
}
export default defineComponent({
  components: {
    TableTh,
    TableItem,
    TableCheckbox
  },
  props: {
    list: Array as PropType<PostListProps[]>
  },
  emits: ['isChange'],
  setup(props, { emit }) {
    const state: Istate = reactive({
      isAllChecked: false, // 是否全部选中
      checkedList: [],  // checked 选中状态列表
      listLength: 0 // 列表长度
    })

    const change = (result: any) => {  // checkbox 改变
      state.checkedList[result[0]] = { id: result[1], isChecked: result[2] }  // result：[index, id, isChecked]
      emit('isChange', state.checkedList)
      if(state.checkedList.length < state.listLength) return
      const res = state.checkedList.every(item => {
        return item.isChecked === true
      })
      state.isAllChecked = res
    }
    const itemOnMounted = () => state.listLength++
    const allCheckboxChange = () => { // 食物链顶端的 checkbox 被改变（大雾
      const value = state.isAllChecked = !state.isAllChecked  // 切换状态
      if(value) { // 如果勾上了
        for(const i in props.list) {  // 按照当前列表的数据长度循环
          state.checkedList[Number(i)] = {
            id: props.list[Number(i)].id,
            isChecked: true
          } // true 一把梭
        }
      } else {  // 不然没勾上
        state.checkedList = []  // 清空
      }
      emit('isChange', state.checkedList)
    }

    return {
      ...toRefs(state),
      change,
      itemOnMounted,
      allCheckboxChange
    }
  }
})
</script>
