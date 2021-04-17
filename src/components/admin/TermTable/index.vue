<template>
  <table class="w-full border border-gray-100">
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
            <p class="ml-4">名称</p>
          </label>
        </th>
        <th
          class="hidden lg:table-cell w-1/6 px-5 py-3 text-left text-xs font-medium text-gray-500 tracking-wider lg:"
        >
          ID
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <term-table-item
        v-for="item in items"
        :key="item.id"
        :data="item"
        :type="type"
        @edit="edit"
        @onDelete="onDelete"
        @handleCheckboxChange="checkedChange"
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
import { TermProps } from '@/types'
import TermTableItem from './Item.vue'

export default defineComponent({
  name: 'TermTable',
  components: { TermTableItem },
  props: {
    data: {
      type: Array as PropType<TermProps[]>
    },
    type: {
      type: String,
      required: true
    }
  },
  emits: ['edit', 'onDelete'],
  setup(props, { emit }) {
    const state = reactive({
      items: props.data,
      checkedTotal: computed(
        () =>
          [].filter.call(props.data, (item: TermProps) => item.checked === true)
            .length
      )
    })

    const checkedChange = ({ id, checked }: any) => {
      state.items.forEach(item => {
        if (item.id === id) item.checked = checked
      })
    }
    const handleAllCheckboxChange = (e: InputEvent) => {
      state.items.forEach(item => {
        item.checked = (e.target as InputHTMLAttributes).checked
      })
    }

    const edit = (data: TermProps) => {
      emit('edit', data)
    }
    const onDelete = (data: TermProps) => {
      emit('onDelete', data)
    }

    const getCheckedAll = () => {
      const idArr: string[] = []
      state.items.forEach(item => {
        if (item.checked) idArr.push(item.id)
      })
      return idArr
    }

    return {
      ...toRefs(state),
      checkedChange,
      handleAllCheckboxChange,
      getCheckedAll,
      edit,
      onDelete
    }
  }
})
</script>
