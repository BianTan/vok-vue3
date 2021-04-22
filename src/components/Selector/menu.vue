<template>
  <div class="absolute top-10 left-0 w-full px-3 z-20">
    <ul class="bg-white shadow rounded-md overflow-hidden text-center">
      <li
        class="text-sm h-10 leading-10 cursor-pointer hover:bg-opacity-80 hover:bg-gray-100 transition ease-in-out duration-300"
        v-for="item in searchData"
        :key="item.id"
        @click="itemClick([item.value, item.text])"
      >
        {{ item.text }}
      </li>
      <li class="text-center py-12" v-if="searchData.length === 0">暂无结果</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, onMounted } from 'vue'

interface DataProps {
  id: number
  value: string
  text: string
}
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DataProps[]>,
      default: (): [] => []
    },
    searchValue: {
      type: String,
      required: true
    }
  },
  emits: ['itemClick'],
  setup(props, { emit }) {
    const searchData = ref<DataProps[]>([]) // 搜索数据

    onMounted(() => {
      searchData.value = props.data as DataProps[] // 初始化搜索数据为粑粑传下来的 data
    })
    const dataFilter = (value: string) => {
      // 过滤方法
      if (props.data) {
        // 如果存在 data
        return (props.data as DataProps[]).filter((f: DataProps) => {
          const res = f.text.toLowerCase().includes(value.toLowerCase()) // 每一项数据的 text 变小写字母并判断是否包含输入框的 value
          return res
        })
      }
      return []
    }
    watch(
      () => props.searchValue,
      () => {
        // 监听 input 框的 value 是否有变化
        searchData.value = dataFilter(props.searchValue as string) // 调用过滤方法
      }
    )

    const itemClick = (res: any) => {
      emit('itemClick', res) // 点击 li 把数据上传给粑粑 index.vue。
    }
    return {
      itemClick,
      searchData
    }
  }
})
</script>
